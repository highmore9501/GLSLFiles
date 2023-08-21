// Created with NodeToy | Three.js r149

// <node_builder>

// uniforms
uniform sampler2D org; uniform sampler2D rainMix; uniform float _time; 
// attributes

// varys
varying vec2 nodeVary0; varying vec3 nodeVary1; varying vec3 nodeVary2; 
// vars
vec4 nodeVar0; vec3 nodeVar1; vec4 nodeVar2; float nodeVar3; float nodeVar4; vec3 nodeVar5; vec3 nodeVar6; float nodeVar7; float nodeVar8; float nodeVar9; float nodeVar10; float nodeVar11; float nodeVar12; float nodeVar13; float nodeVar14; float nodeVar15; float nodeVar16; float nodeVar17; float nodeVar18; float nodeVar19; float nodeVar20; float nodeVar21; float nodeVar22; float nodeVar23; float nodeVar24; float nodeVar25; float nodeVar26; float nodeVar27; vec4 nodeVar28; vec4 nodeVar29; float nodeVar30; 
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
nodeVar0 = ( texture2D( org, nodeVary0 ) );
	nodeVar1 = ( nodeVar0.xyz * vec3( 1, 1, 1 ) );
	
	diffuseColor = vec4( nodeVar1, 1.0 );

	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
nodeVar30 = (mix(0.003, 0.8, nodeVar23));
		
	
	roughnessFactor = nodeVar30;

	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
nodeVar2 = ( texture2D( rainMix, nodeVary0 ) );
	nodeVar3 = ( nodeVar2.x * 2.0 );
	nodeVar4 = ( nodeVar3 - 1.0 );
	nodeVar5 = (normalize(nodeVary1));
	nodeVar6 = normalize(nodeVar5);
	nodeVar7 = ( nodeVar6.y + 1.0 );
	nodeVar8 = ( nodeVar7 / 2.0 );
	nodeVar9 = ( nodeVar2.w * 2.0 );
	nodeVar10 = ( nodeVar9 - 1.0 );
	nodeVar11 = ( nodeVar10 * -1.0 );
	nodeVar12 = (pow(nodeVar11,10.0));
	nodeVar13 = clamp( nodeVar12, 0.0, 1.0 );
	nodeVar14 = ( _time * 1.0 );
	nodeVar15 = nodeVar14;
	nodeVar16 = sin( nodeVar15 );
	nodeVar17 = ( nodeVar2.z - nodeVar16 );
	nodeVar18 = abs( nodeVar17 );
	nodeVar19 = clamp( nodeVar10, 0.0, 1.0 );
	nodeVar20 = ( nodeVar18 * nodeVar19 );
	nodeVar21 = ( nodeVar13 + nodeVar20 );
	nodeVar22 = clamp( nodeVar21, 0.0, 1.0 );
	nodeVar23 = ( nodeVar8 * nodeVar22 );
	nodeVar24 = ( nodeVar4 * nodeVar23 );
	nodeVar25 = ( nodeVar2.y * 2.0 );
	nodeVar26 = ( nodeVar25 - 1.0 );
	nodeVar27 = ( nodeVar23 * nodeVar26 );
	nodeVar28 = vec4(nodeVar24,nodeVar27,1.0,0.0);
	nodeVar29 = (normalize(nodeVar28));
	
	vec3 mapN = nodeVar29.xyz * 2.0 - 1.0;
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


