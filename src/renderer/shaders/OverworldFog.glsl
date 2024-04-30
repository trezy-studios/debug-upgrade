precision mediump float;

uniform float uTime; // The time in seconds.
uniform float resolution; // Device pixel ratio (DPR).
varying vec2 vTextureCoord; // The texture coordinate, passed from the vertex shader.

uniform vec4 uFogColor; // RGBA solid color.
uniform vec2 uRadius; // Radius in device pixels.
uniform sampler2D uSampler; // The original texture.
uniform sampler2D uFogMap; // The fog texture.
uniform float uScale; // Scaling factor for the rendered output.
uniform float uStageHeight; // In CSS pixels.
uniform float uStageWidth; // In CSS pixels.
uniform float uFogmapBlocksToUnhide[64];


float easeIn(float t, float b, float c, float d) {
	return c * (t /= d) * t + b;
}

// TODO
// if color matches transition color in texture
// fade that color in
// otherwise show background color

bool fuzzyMatch(float a, float b) {
	float epsilon = 1e-4;
	return abs(a - b) < epsilon;
}

void main() {
	// magic number, should be derrived from container size
	// but works for now
	vec2 scale = vec2(1.255, 1.780);
	vec2 scaledCoordinates = vTextureCoord * scale;
	float animatedTime = sin(uTime / 100.0);
	float animatedOpacity = 1.0 - animatedTime;
	vec4 sceneColor = texture2D(uSampler, vTextureCoord);
	vec4 fogMapColor =  texture2D(uFogMap, scaledCoordinates);
	vec4 fogColor = uFogColor / 255.0;
	bool hidden = true; 

	for (int i = 0; i < 64; i++) {
		bool coveredByFogMap = fogMapColor.a == 1.0;
		// we need to match with epsilon because of floating point precision
		if (coveredByFogMap && fuzzyMatch(fogMapColor.r, uFogmapBlocksToUnhide[i] / 255.0)) {
			hidden = false;
			break;
		}
	}

	if (hidden) {
		sceneColor = fogColor;
	}

	gl_FragColor = sceneColor;
}
