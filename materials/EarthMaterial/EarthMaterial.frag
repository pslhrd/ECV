precision highp float;

uniform sampler2D map;

varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vViewDirection;

void main() {
	float uFresnelPower = 3.;
	float fresnelFactor = abs(dot(vViewDirection, vWorldNormal));
	float inversefresnelFactor = 1.0 - fresnelFactor;

	fresnelFactor = pow(fresnelFactor, uFresnelPower);
	inversefresnelFactor = pow(inversefresnelFactor, uFresnelPower);

	vec3 diffuse = texture2D(map, vUv).rgb;

	float topFresnel = clamp(inversefresnelFactor * vWorldNormal.y, 0., 1.);

	diffuse += topFresnel * 0.7;
	diffuse += inversefresnelFactor * 0.15;

	gl_FragColor = vec4(vec3(diffuse), 1.0);
}
