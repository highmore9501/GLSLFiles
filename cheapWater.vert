// Created with NodeToy | Three.js r149

// <node_builder>

// uniforms
uniform mat4 _modelMatrix; uniform mat3 _normalMatrix; uniform mat4 _viewMatrix; uniform sampler2D noise2; uniform float _time; 
// attributes

// varys
varying vec3 nodeVary0; varying vec3 nodeVary1; varying vec4 nodeVary2; varying vec3 nodeVary3; varying vec3 nodeVary4; varying vec3 nodeVary5; varying vec2 nodeVary6; 
// vars
vec4 nodeVar0; vec4 nodeVar1; vec3 nodeVar2; vec3 nodeVar3; vec3 nodeVar4; vec4 nodeVar5; vec4 nodeVar6; vec3 nodeVar7; vec3 nodeVar8; float nodeVar9; float nodeVar10; vec2 nodeVar11; vec4 nodeVar12; vec4 nodeVar13; 
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
nodeVary1 = position;
	nodeVar0 = ( vec4( nodeVary1, 0.0 ) );
	nodeVar1 = ( _modelMatrix * nodeVar0 );
	nodeVar2 = normalize( nodeVar1.xyz );
	nodeVar3 = nodeVar2;
	nodeVary0 = nodeVar3;
	nodeVary2 = tangent;
	nodeVary4 = normal;
	nodeVar4 = ( _normalMatrix * nodeVary4 );
	nodeVar5 = ( vec4( nodeVar4, 0.0 ) );
	nodeVar6 = ( nodeVar5 * _viewMatrix );
	nodeVar7 = normalize( nodeVar6.xyz );
	nodeVar8 = nodeVar7;
	nodeVary3 = nodeVar8;
	nodeVary5 = normal;
	nodeVary6 = uv;
	


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
nodeVar9 = ( _time * 1.0 );
	nodeVar10 = nodeVar9;
	nodeVar11 = nodeVar10 * vec2( 0.2, 0.2 ) + uv;
	nodeVar12 = ( texture2D( noise2, nodeVar11 ) );
	nodeVar13 = ( nodeVar12 * vec4( vec3( 0.1 ), 1.0 ) );
	
	transformed = position + nodeVar13.xyz;

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


