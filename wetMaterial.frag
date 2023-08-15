// Created with NodeToy | Three.js r149

// <node_builder>

// uniforms
uniform sampler2D nodeUniform0; 
// attributes

// varys
varying vec2 nodeVary0; varying vec3 nodeVary1; varying vec3 nodeVary2; 
// vars
vec4 nodeVar0; vec3 nodeVar1; vec3 nodeVar2; vec3 nodeVar3; vec3 nodeVar4; float nodeVar5; float nodeVar6; vec4 nodeVar7; vec3 nodeVar8; float nodeVar9; 
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
nodeVar0 = ( texture2D( nodeUniform0, nodeVary0 ) );
	nodeVar1 = (mix( vec4( 0.8941176470588236, 0.9254901960784314, 0.3137254901960784, 1 ).xyz, vec3(dot( vec4( 0.8941176470588236, 0.9254901960784314, 0.3137254901960784, 1 ).xyz, vec3( 0.299, 0.587, 0.114 ))), 0.8 ));
	nodeVar2 = clamp( nodeVar1, 0.0, 1.0 );
	nodeVar3 = (normalize(nodeVary1));
	nodeVar4 = normalize(nodeVar3);
	nodeVar5 = ( nodeVar4.y + 1.0 );
	nodeVar6 = ( nodeVar5 / 2.0 );
	nodeVar7 = (mix(nodeVar0, vec4( nodeVar2, 1.0 ), vec4( vec3( nodeVar6 ), 1.0 )));
		
	nodeVar8 = ( nodeVar7.xyz * vec3( 1, 1, 1 ) );
	
	diffuseColor = vec4( nodeVar8, 1.0 );

	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
nodeVar9 = (mix(0.5, 0.03, nodeVar6));
		
	
	roughnessFactor = nodeVar9;

	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	
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


