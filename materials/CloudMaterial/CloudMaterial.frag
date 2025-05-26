precision highp float;

uniform sampler2D map;
uniform sampler2D noise;

uniform float time;

varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vViewDirection;

void main() {
	float uFresnelPower = 2.;
	float fresnelFactor = abs(dot(vViewDirection, vWorldNormal));
	float inversefresnelFactor = 1.0 - fresnelFactor;

	fresnelFactor = pow(fresnelFactor, uFresnelPower);
	inversefresnelFactor = pow(inversefresnelFactor, uFresnelPower);

	vec2 noiseUV = vUv;
	noiseUV.x -= time * 10.;
	vec3 noiseMap = texture2D(noise, noiseUV * 10.).rgb;

	vec3 diffuse = texture2D(map, vUv).rgb;
	float alpha = clamp(fresnelFactor * 0.2, 0., 1.);

	gl_FragColor = vec4(vec3(1. - diffuse.r), alpha);
	// gl_FragColor = vec4(noiseMap, 1.);
}
