// Created with NodeToy | Three.js r149

// <node_builder>

// uniforms
uniform sampler2D noise2; uniform float _time; 
// attributes

// varys
varying vec3 nodeVary0; varying vec3 nodeVary1; varying vec4 nodeVary2; varying vec3 nodeVary3; varying vec3 nodeVary4; varying vec3 nodeVary5; varying vec2 nodeVary6; 
// vars
vec3 nodeVar0; vec3 nodeVar1; vec3 nodeVar2; vec3 nodeVar3; vec3 nodeVar4; vec3 nodeVar5; vec3 nodeVar6; vec3 nodeVar7; float nodeVar8; float nodeVar9; vec2 nodeVar10; vec2 nodeVar11; vec4 nodeVar12; vec4 nodeVar13; float nodeVar14; float nodeVar15; vec2 nodeVar16; vec4 nodeVar17; vec4 nodeVar18; vec3 nodeVar19; 
// codes
vec3 customFn_eqxAbZNyX6A9 ( float height ) {
                
    
    bool invertY = false;
    float intensity = float(0.5) * 0.1;
    mat3 TangentMatrix = mat3(nodeVar1,nodeVar6,nodeVar7);
    
    vec3 worldDerivativeX = dFdx(nodeVary0);
    vec3 worldDerivativeY = dFdy(nodeVary0);

    vec3 crossX = cross(TangentMatrix[2].xyz, worldDerivativeX);
    vec3 crossY = cross(worldDerivativeY, TangentMatrix[2].xyz);
    float d = dot(worldDerivativeX, crossY);
    float sgn = d < 0.0 ? (-1.f) : 1.f;
    float surface = sgn / max(0.00000000000001192093f, abs(d));

    float dHdx = dFdx(height);
    float dHdy = dFdy(height);
    vec3 surfGrad = surface * (dHdx*crossY + dHdy*crossX);
    vec3 norm = normalize(TangentMatrix[2].xyz - (intensity * surfGrad));

    norm = norm * TangentMatrix;

    // Invert the green channel if necessary
    if (invertY)
    {
        norm.g = 1.0 - norm.g;
    }

    return norm * 0.5 + 0.5;
    
            }
float remap_pParVzb5bYfM ( float value, float minOld, float maxOld, float minNew, float maxNew ) {
		float x = ( value - minOld ) / ( maxOld - minOld );
		return minNew + ( maxNew - minNew ) * x;
	}
vec4 customFn_CP5UsALs9Nh3 ( vec4 value, vec4 minOld, vec4 maxOld, vec4 minNew, vec4 maxNew ) {
                
    return vec4(
        remap_pParVzb5bYfM( value.x, minOld.x, maxOld.x, minNew.x, maxNew.x ),
        remap_pParVzb5bYfM( value.y, minOld.y, maxOld.y, minNew.y, maxNew.y ),
        remap_pParVzb5bYfM( value.z, minOld.z, maxOld.z, minNew.z, maxNew.z ),
        remap_pParVzb5bYfM( value.w, minOld.w, maxOld.w, minNew.w, maxNew.w )
    );
            
            }

// variables
// </node_builder>







#define STANDARD

#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif

#ifdef IOR
	float ior;
#endif

#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;

	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif

	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif

#ifdef USE_CLEARCOAT
	float clearcoat;
	float clearcoatRoughness;
#endif

#ifdef USE_IRIDESCENCE
	float iridescence;
	float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	float iridescenceThicknessMaximum;
#endif

#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;

	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif

	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif

varying vec3 vViewPosition;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {



	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 0.0 );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
nodeVar0 = ( vec4( 0.4235294117647059, 0.7686274509803922, 0.9529411764705882, 1 ).xyz * vec3( 1, 1, 1 ) );
	
	diffuseColor = vec4( nodeVar0, 1.0 );

	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>

	roughnessFactor = 0.1;

	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
nodeVar1 = normalize(nodeVary2.xyz);
	nodeVar2 = (normalize(nodeVary3));
	nodeVar3 = normalize(nodeVar2);
	nodeVar4 = normalize(nodeVary2.xyz);
	nodeVar5 = normalize(cross(nodeVary5, nodeVary2.xyz));
	nodeVar6 = normalize(nodeVar5);
	nodeVar7 = normalize(nodeVar2);
	nodeVar8 = ( _time * 1.0 );
	nodeVar9 = nodeVar8;
	nodeVar10 = nodeVar9 * vec2( 0.05, 0.025 ) + nodeVary6;
	nodeVar11 = ( nodeVar10 * vec2( 4.0 ) );
	nodeVar12 = ( texture2D( noise2, nodeVar11 ) );
	nodeVar13 = customFn_CP5UsALs9Nh3( nodeVar12, vec4( vec3( 0.0 ), 1.0 ), vec4( vec3( 1.0 ), 1.0 ), vec4( vec3( 0.8 ), 1.0 ), vec4( vec3( 1.0 ), 1.0 ) );
	nodeVar14 = ( _time * 1.0 );
	nodeVar15 = nodeVar14;
	nodeVar16 = nodeVar15 * vec2( 0.2, 0.2 ) + nodeVary6;
	nodeVar17 = ( texture2D( noise2, nodeVar16 ) );
	nodeVar18 = ( nodeVar13 * nodeVar17 );
	nodeVar19 = customFn_eqxAbZNyX6A9( nodeVar18.x );
	
	vec3 mapN = nodeVar19 * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize(vTBN * mapN);

	
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	

	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

	#include <transmission_fragment>

	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

	#ifdef USE_SHEEN

		// Sheen energy compensation approximation calculation can be found at the end of
		// https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );

		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;

	#endif

	#ifdef USE_CLEARCOAT

		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );

		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );

		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;

	#endif

	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}


