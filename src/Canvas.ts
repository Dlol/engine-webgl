export default class Canvas{
	c: HTMLCanvasElement;
	gl: WebGLRenderingContext | null;
	constructor(width:number, height:number){
		this.c = document.createElement("canvas");
		this.c.setAttribute("width", String(width));
		this.c.setAttribute("height", String(height));
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