precision mediump float;

uniform float vpw;
uniform float vph;
uniform float resolution;
uniform sampler2D uSampler;
uniform float thickness;
uniform float uiScale;
varying vec2 vTextureCoord;

uniform vec2 offset;
uniform vec2 pitch;
uniform vec4 lineColor;

void main() {
	float offX = (offset[0] * uiScale) + gl_FragCoord.x / uiScale;
	float offY = (offset[1] * uiScale) + (vph - gl_FragCoord.y) / uiScale;

	float rX = min(
		abs(pitch[0] - mod(offX, pitch[0])),
		abs(mod(offX, pitch[0]))
	);

	float rY = min(
		abs(pitch[1] - mod(offY, pitch[1])),
		abs(mod(offY, pitch[1]))
	);

	vec4 texColor = texture2D(uSampler, vTextureCoord);

	if (
		int(rX) <= int(thickness / 2.0)
		|| int(rY) <= int(thickness / 2.0)
	) {
		gl_FragColor = lineColor;
		gl_FragColor.rgb = mix(gl_FragColor.rgb, texColor.rgb, 0.7);
	} else {
		gl_FragColor = texColor;
	}
}
