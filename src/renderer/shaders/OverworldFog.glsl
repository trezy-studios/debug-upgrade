precision mediump float;

uniform float resolution; // Device pixel ratio (DPR).
varying vec2 vTextureCoord; // The texture coordinate, passed from the vertex shader.

uniform vec4 uFogColor; // RGBA solid color.
uniform float uPointsCount;
uniform vec2 uOffset;
uniform sampler2D uPointsTexture;
uniform vec2 uRadius; // Radius in device pixels.
uniform sampler2D uSampler; // The original texture.
uniform float uScale; // Scaling factor for the rendered output.
uniform float uStageHeight; // In CSS pixels.
uniform float uStageWidth; // In CSS pixels.

const float MAX_POINTS = 100.0;

void main() {
	vec4 textureColor = texture2D(uSampler, vTextureCoord);
	bool withinRadius = false;

	// // Adjust radius for scale and resolution
	// float effectiveWidth = uStageWidth;
	// float effectiveHeight = uStageHeight;
	// float normalizedRadius = uRadius / uStageWidth;// ((uRadius / effectiveWidth) + (uRadius / effectiveHeight)) / 2.0;

	// // Apply offset and scale, considering resolution
	// vec2 scaledTextureCoord = vTextureCoord;

	for (float index = 0.0; index < MAX_POINTS; ++index) {
		if (index >= uPointsCount) {
			break;
		}

		vec4 pointData = texture2D(uPointsTexture, vec2(index / MAX_POINTS, 0));
		vec2 point = pointData.xy;

		vec2 diff = vTextureCoord - point;
		vec2 diffSquared = diff * diff;

		vec2 radiusSquared = uRadius * uRadius;

		if ((diffSquared.x < radiusSquared.x) && (diffSquared.y < radiusSquared.y)) {
			withinRadius = true;
			break;
		}
	}

	if (withinRadius) {
		// gl_FragColor = textureColor;
		gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
	} else {
		// gl_FragColor = uFogColor;
		gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
	}

	gl_FragColor.rgb = mix(textureColor.rgb, gl_FragColor.rgb, 0.5);
}
