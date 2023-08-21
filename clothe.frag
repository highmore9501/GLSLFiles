// Created with NodeToy | Three.js r149

// <node_builder>

// uniforms
uniform vec3 _viewDir; uniform sampler2D clotheN; uniform sampler2D clothe; uniform sampler2D clotheR; 
// attributes

// varys
varying vec4 nodeVary0; varying vec3 nodeVary1; varying vec3 nodeVary2; varying vec3 nodeVary3; varying vec2 nodeVary4; 
// vars
vec3 nodeVar0; vec3 nodeVar1; vec3 nodeVar2; vec3 nodeVar3; vec3 nodeVar4; vec3 nodeVar5; vec3 nodeVar6; vec3 nodeVar7; mat3 nodeVar8; mat3 nodeVar9; vec2 nodeVar10; vec4 nodeVar11; vec3 nodeVar12; float nodeVar13; float nodeVar14; float nodeVar15; float nodeVar16; float nodeVar17; float nodeVar18; float nodeVar19; vec4 nodeVar20; vec4 nodeVar21; vec3 nodeVar22; vec4 nodeVar23; 
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
nodeVar0 = _viewDir;
	nodeVar1 = normalize(nodeVary0.xyz);
	nodeVar2 = (normalize(nodeVary1));
	nodeVar3 = normalize(nodeVar2);
	nodeVar4 = normalize(nodeVary0.xyz);
	nodeVar5 = normalize(cross(nodeVary3, nodeVary0.xyz));
	nodeVar6 = normalize(nodeVar5);
	nodeVar7 = normalize(nodeVar2);
	nodeVar8 = mat3(nodeVar1,nodeVar6,nodeVar7);
	nodeVar9 = inverse( nodeVar8 );
	nodeVar10 = (nodeVary4 * vec2( 3, 3 ) + vec2( 0, 0 ));
	nodeVar11 = ( texture2D( clotheN, nodeVar10 ) );
	nodeVar12 = ( nodeVar9 * nodeVar11.xyz );
	nodeVar13 = (dot(nodeVar0,nodeVar12));
	nodeVar14 = ( 1.0 - nodeVar13 );
	nodeVar15 = (pow(nodeVar14,2.0));
	nodeVar16 = ( nodeVar15 * 2.0 );
	nodeVar17 = (pow(nodeVar13,2.0));
	nodeVar18 = ( nodeVar17 * 2.0 );
	nodeVar19 = ( nodeVar16 + nodeVar18 );
	nodeVar20 = ( texture2D( clothe, nodeVar10 ) );
	nodeVar21 = ( vec4( vec3( nodeVar19 ), 1.0 ) * nodeVar20 );
	nodeVar22 = ( nodeVar21.xyz * vec3( 1, 1, 1 ) );
	
	diffuseColor = vec4( nodeVar22, 1.0 );

	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
nodeVar23 = ( texture2D( clotheR, nodeVar10 ) );
	
	roughnessFactor = nodeVar23.x;

	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>

	vec3 mapN = nodeVar11.xyz * 2.0 - 1.0;
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


