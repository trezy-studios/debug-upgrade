precision mediump float;

uniform float resolution; // Device pixel ratio (DPR).
varying vec2 vTextureCoord; // The texture coordinate, passed from the vertex shader.

uniform vec4 uLineColor;
uniform float uLineThickness;
uniform vec2 uOffset;
uniform vec2 uPitch;
uniform sampler2D uSampler; // The original texture.
uniform float uScale; // Scaling factor for the rendered output.
uniform float uStageHeight; // In CSS pixels.
uniform float uStageWidth; // In CSS pixels.

void main() {
	float offsetX = (gl_FragCoord.x - uOffset[0]) / uScale;
	float offsetY = (uStageHeight - (gl_FragCoord.y + uOffset[1])) / uScale;

	float radiusX = min(
		abs(uPitch[0] - mod(offsetX, uPitch[0])),
		abs(mod(offsetX, uPitch[0]))
	);

	float radiusY = min(
		abs(uPitch[1] - mod(offsetY, uPitch[1])),
		abs(mod(offsetY, uPitch[1]))
	);

	vec4 textureColor = texture2D(uSampler, vTextureCoord);

	if (
		int(radiusX) <= int(uLineThickness / 2.0)
		|| int(radiusY) <= int(uLineThickness / 2.0)
	) {
		gl_FragColor = uLineColor;
		gl_FragColor.rgb = mix(gl_FragColor.rgb, textureColor.rgb, 0.7);
	} else {
		gl_FragColor = textureColor;
	}
}
