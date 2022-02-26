>>VERT<<
attribute vec4 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uProjectionMatrix;

varying highp vec2 vTextureCoord;

void main() {
	gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * aVertexPosition;
	vTextureCoord = aTextureCoord;
}

>>FRAG<<
// uniform mediump vec4 uColor;
varying highp vec2 vTextureCoord;

uniform sampler2D uSampler;

void main() {
	gl_FragColor = texture2D(uSampler, vTextureCoord);
}