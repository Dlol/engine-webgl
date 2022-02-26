>>VERT<<
attribute vec4 aVertexPosition;
uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uProjectionMatrix;
void main() {
	gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * aVertexPosition;
}

>>FRAG<<
uniform mediump vec4 uColor;

void main() {
	gl_FragColor = uColor;
}