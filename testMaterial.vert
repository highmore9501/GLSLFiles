// Created with NodeToy | Three.js r149

// <node_builder>

// uniforms
uniform mat3 _normalMatrix; uniform mat4 _viewMatrix; 
// attributes

// varys
varying vec3 nodeVary0; varying vec3 nodeVary1; 
// vars
vec3 nodeVar0; vec4 nodeVar1; vec4 nodeVar2; vec3 nodeVar3; vec3 nodeVar4; 
// codes

// variables
// </node_builder>







#define STANDARD

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

	varying vec3 vWorldPosition;

#endif

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {
nodeVary1 = normal;
	nodeVar0 = ( _normalMatrix * nodeVary1 );
	nodeVar1 = ( vec4( nodeVar0, 0.0 ) );
	nodeVar2 = ( nodeVar1 * _viewMatrix );
	nodeVar3 = normalize( nodeVar2.xyz );
	nodeVar4 = nodeVar3;
	nodeVary0 = nodeVar4;
	


	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

#ifdef USE_TRANSMISSION

	vWorldPosition = worldPosition.xyz;

#endif
}


