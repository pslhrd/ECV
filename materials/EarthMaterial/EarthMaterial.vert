precision highp float;

uniform sampler2D map;

varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vViewDirection;

void main() {

	float elevation = texture2D(map, vUv).r;
	vec3 transformed = position;

	vec4 worldPosition = modelMatrix * vec4(position, 1.0);
	vWorldNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
	vViewDirection = normalize(cameraPosition - worldPosition.xyz);

	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
