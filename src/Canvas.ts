// basically importing but in pre es2016 ig
const { mat2, mat3, mat4, vec2, vec3, vec4, quat } = glMatrix;

class Canvas{
	c: HTMLCanvasElement;
	gl: WebGLRenderingContext;
	constructor(width:number, height:number){
		this.c = document.createElement("canvas");
		this.c.setAttribute("width", width);
		this.c.setAttribute("height", height);
		this.c.addEventListener("contextmenu", (e)=>{e.preventDefault();})
		this.gl = this.c.getContext("webgl");
		if (!this.gl) {
			alert(
				"Unable to initialize WebGL. Your browser or machine may not support it.",
			);
			return;
		}
	}
}