// Created with NodeToy | Three.js r149

// <node_builder>

// uniforms
uniform sampler2D rock; uniform sampler2D grass; uniform sampler2D snow; uniform sampler2D rockN; uniform sampler2D grassN; uniform sampler2D snowN; uniform sampler2D rockR; uniform sampler2D grassR; uniform sampler2D snowR; 
// attributes

// varys
varying vec2 nodeVary0; varying vec3 nodeVary1; varying vec3 nodeVary2; varying vec3 nodeVary3; 
// vars
vec2 nodeVar0; vec4 nodeVar1; vec4 nodeVar2; vec4 nodeVar3; float nodeVar4; float nodeVar5; float nodeVar6; float nodeVar7; vec4 nodeVar8; vec3 nodeVar9; vec3 nodeVar10; float nodeVar11; float nodeVar12; vec4 nodeVar13; vec3 nodeVar14; vec4 nodeVar15; vec4 nodeVar16; vec4 nodeVar17; vec4 nodeVar18; vec4 nodeVar19; vec4 nodeVar20; vec4 nodeVar21; vec4 nodeVar22; vec4 nodeVar23; vec4 nodeVar24; vec4 nodeVar25; vec4 nodeVar26; 
// codes

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
nodeVar0 = (nodeVary0 * vec2( 20, 20 ) + vec2( 0, 0 ));
	nodeVar1 = ( texture2D( rock, nodeVar0 ) );
	nodeVar2 = ( texture2D( grass, nodeVar0 ) );
	nodeVar3 = ( texture2D( snow, nodeVar0 ) );
	nodeVar4 = ( nodeVary1.y - 12.0 );
	nodeVar5 = exp2( nodeVar4 );
	nodeVar6 = ( nodeVar5 / 80.0 );
	nodeVar7 = clamp( nodeVar6, 0.0, 1.0 );
	nodeVar8 = (mix(nodeVar2, nodeVar3, vec4( vec3( nodeVar7 ), 1.0 )));
		
	nodeVar9 = (normalize(nodeVary2));
	nodeVar10 = normalize(nodeVar9);
	nodeVar11 = ( nodeVar10.y / 0.3 );
	nodeVar12 = clamp( nodeVar11, 0.0, 1.0 );
	nodeVar13 = (mix(nodeVar1, nodeVar8, vec4( vec3( nodeVar12 ), 1.0 )));
		
	nodeVar14 = ( nodeVar13.xyz * vec3( 1, 1, 1 ) );
	
	diffuseColor = vec4( nodeVar14, 1.0 );

	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
nodeVar21 = ( texture2D( rockR, nodeVar0 ) );
	nodeVar22 = ( texture2D( grassR, nodeVar0 ) );
	nodeVar23 = ( texture2D( snowR, nodeVar0 ) );
	nodeVar24 = (mix(nodeVar22, nodeVar23, vec4( vec3( nodeVar7 ), 1.0 )));
		
	nodeVar25 = (mix(nodeVar21, nodeVar24, vec4( vec3( nodeVar12 ), 1.0 )));
		
	nodeVar26 = clamp( nodeVar25, 0.0, 1.0 );
	
	roughnessFactor = nodeVar26.x;

	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
nodeVar15 = ( texture2D( rockN, nodeVar0 ) );
	nodeVar16 = ( texture2D( grassN, nodeVar0 ) );
	nodeVar17 = ( texture2D( snowN, nodeVar0 ) );
	nodeVar18 = (mix(nodeVar16, nodeVar17, vec4( vec3( nodeVar7 ), 1.0 )));
		
	nodeVar19 = (mix(nodeVar15, nodeVar18, vec4( vec3( nodeVar12 ), 1.0 )));
		
	nodeVar20 = (normalize(nodeVar19));
	
	vec3 mapN = nodeVar20.xyz * 2.0 - 1.0;
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


