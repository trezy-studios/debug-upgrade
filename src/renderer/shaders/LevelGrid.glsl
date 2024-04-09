precision mediump float;

uniform float viewportHeight;
uniform float viewportWidth;
uniform sampler2D uSampler;
uniform float resolution;
uniform float thickness;
uniform float uiScale;
varying vec2 vTextureCoord;

uniform vec2 offset;
uniform vec2 pitch;
uniform vec4 lineColor;

void main() {
	float offsetX = (gl_FragCoord.x + offset[0]) / uiScale;
	float offsetY = ((viewportHeight / resolution) - (gl_FragCoord.y + offset[1])) / uiScale;

	float radiusX = min(
		abs(pitch[0] - mod(offsetX, pitch[0])),
		abs(mod(offsetX, pitch[0]))
	);

	float radiusY = min(
		abs(pitch[1] - mod(offsetY, pitch[1])),
		abs(mod(offsetY, pitch[1]))
	);

	vec4 textureColor = texture2D(uSampler, vTextureCoord);

	if (
		int(radiusX) <= int(thickness / 2.0)
		|| int(radiusY) <= int(thickness / 2.0)
	) {
		gl_FragColor = lineColor;
		gl_FragColor.rgb = mix(gl_FragColor.rgb, textureColor.rgb, 0.7);
	} else {
		gl_FragColor = textureColor;
	}
}
