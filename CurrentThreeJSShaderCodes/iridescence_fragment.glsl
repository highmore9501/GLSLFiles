#ifdef USE_IRIDESCENCE
const mat3 XYZ_TO_REC709 = mat3(
		3.2404542, -0.9692660,	0.0556434,
	 -1.5371385,	1.8760108, -0.2040259,
	 -0.4985314,	0.0415560,	1.0572252
);
vec3 Fresnel0ToIor( vec3 fresnel0 ) {
	 vec3 sqrtF0 = sqrt( fresnel0 );
	 return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
}
vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
	 return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
}
float IorToFresnel0( float transmittedIor, float incidentIor ) {
	 return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
}
vec3 evalSensitivity( float OPD, vec3 shift ) {
	 float phase = 2.0 * PI * OPD * 1.0e-9;
	 vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
	 vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
	 vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
	 vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( -pow2( phase ) * var );
	 xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[0] ) * exp( -4.5282e+09 * pow2( phase ) );
	 xyz /= 1.0685e-7;
	 vec3 srgb = XYZ_TO_REC709 * xyz;
	 return srgb;
}
vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
	 vec3 I;
	 float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
	 float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
	 float cosTheta2Sq = 1.0 - sinTheta2Sq;
	 if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
	 }
	 float cosTheta2 = sqrt( cosTheta2Sq );
	 float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
	 float R12 = F_Schlick( R0, 1.0, cosTheta1 );
	 float R21 = R12;
	 float T121 = 1.0 - R12;
	 float phi12 = 0.0;
	 if ( iridescenceIOR < outsideIOR ) phi12 = PI;
	 float phi21 = PI - phi12;
	 vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );	 vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
	 vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
	 vec3 phi23 = vec3( 0.0 );
	 if ( baseIOR[0] < iridescenceIOR ) phi23[0] = PI;
	 if ( baseIOR[1] < iridescenceIOR ) phi23[1] = PI;
	 if ( baseIOR[2] < iridescenceIOR ) phi23[2] = PI;
	 float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
	 vec3 phi = vec3( phi21 ) + phi23;
	 vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
	 vec3 r123 = sqrt( R123 );
	 vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
	 vec3 C0 = R12 + Rs;
	 I = C0;
	 vec3 Cm = Rs - T121;
	 for ( int m = 1; m <= 2; ++m ) {
			 Cm *= r123;
			 vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			 I += Cm * Sm;
	 }
	 return max( I, vec3( 0.0 ) );
}
#endif