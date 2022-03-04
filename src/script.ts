// basically importing but in pre es2016 ig
// const { mat2, mat3, mat4, vec2, vec3, vec4 } = glMatrix;
import {mat4} from 'gl-matrix-ts'

import Canvas from "./Canvas";
import Shader from "./Shader";
import { TextureRect, Shape } from './Shapes';
import { Vec2 } from "./Types";

// class Cell {
// 	enabled: boolean;
// 	canvas: Canvas;
// 	pos: Vec2;
// 	dimen: Vec2;
// 	tile: Rectangle;

// 	constructor(canvas:Canvas, pos:Vec2, dimensions:Vec2, shader: Shader) {
// 		this.enabled = false;
// 		this.canvas = canvas;
// 		this.pos = pos;
// 		this.dimen = dimensions;
// 		this.tile = new Rectangle(pos, dimensions, canvas, Colors.white, shader);
// 	}

// 	draw(){
// 		if (this.enabled) {
// 			this.tile.color = Colors.white;
// 		}
// 		else{
// 			this.tile.color = Colors.black;
// 		}

// 		this.tile.draw();
// 	}
// }

class Game{
	canvas: any;
	sTextured: Shader | undefined;
	buffers: any;
	modelMatrix: any;
	viewMatrix: any;
	counter: number;
	gridDimen: any;
	shapeTest: Shape;
	sBasic: Shader;
	constructor(canvas: Canvas){
		this.canvas = canvas;
		this.counter = 0;
	}

	main() {
		// const canvas = document.querySelector("#glcanvas");
	
		// If we don't have a GL context, give up now
	
		if (!canvas.gl) {
			alert(
				"Unable to initialize WebGL. Your browser or machine may not support it.",
			);
			return;
		}
	
		// Makes an instance of the Shader class to hold our shader
		this.sTextured = new Shader(canvas);
		this.sTextured.initShaderProgram(shaders.textured.vert, shaders.textured.frag);
	
		this.sTextured.addAttribLoc("vertexPosition", "aVertexPosition");
		this.sTextured.addAttribLoc("texPosition", "aTextureCoord");
		this.sTextured.addUniformLoc("projectionMatrix", "uProjectionMatrix");
		this.sTextured.addUniformLoc("viewMatrix", "uViewMatrix");
		this.sTextured.addUniformLoc("modelMatrix", "uModelMatrix");
		this.sTextured.addUniformLoc("sampler", "uSampler");

		// this.sBasic = new Shader(canvas);
		// this.sBasic.initShaderProgram(shaders.Basic.vert, shaders.Basic.frag);
	
		// this.sBasic.addAttribLoc("vertexPosition", "aVertexPosition");
		// this.sBasic.addUniformLoc("projectionMatrix", "uProjectionMatrix");
		// this.sBasic.addUniformLoc("viewMatrix", "uViewMatrix");
		// this.sBasic.addUniformLoc("modelMatrix", "uModelMatrix");
		// this.sBasic.addUniformLoc("color", "uColor");
		
		this.shapeTest = new TextureRect({x:100, y:20}, {x:200, y:200}, canvas, "assets/test2.png", this.sTextured, false);
		console.log(this.shapeTest);
		

		// console.log(shader);
	
		// Draw the scene
		if (this.sTextured.programInfo == null || this.sTextured == null) {
			alert("screaming screaming this.main()")
		} else {
			this.drawScene();
		}
	}


	drawScene() {

		const { gl } = this.canvas;
		const tProgramInfo = this.sTextured?.programInfo;
		// const bProgramInfo = this.sBasic?.programInfo;
		// const buffers = this.buffers;
		gl.enable(gl.BLEND)
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		gl.clearColor(0.13, 0.0, 0.24, 1.0); // Clear to black, fully opaque
		gl.clearDepth(1.0); // Clear everything
	
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
		const projectionMatrix = mat4.create();
	
		// note: glmatrix.js always has the first argument
		// as the destination to receive the result.
		mat4.ortho(projectionMatrix, 0, canvas.c.width, canvas.c.height, 0, 0.0, 2);
	
		// Set the drawing position to the "identity" point, which is
		// the center of the scene.
		this.modelMatrix = mat4.create();
		this.viewMatrix = mat4.create();
	
		// Now move the drawing position a bit to where we want to
		// start drawing the square.
	
		mat4.translate(
			this.modelMatrix, // destination matrix
			this.modelMatrix, // matrix to translate
			[pos.x, pos.y, 0.0],
		); // amount to translate
	
	
		// Tell WebGL to use our program when drawing
	
		this.sTextured.bind();
	
		// Set the shader uniforms
	
		gl.uniformMatrix4fv(
			tProgramInfo?.uniformLocations.projectionMatrix,
			false,
			projectionMatrix,
		);
		gl.uniformMatrix4fv(
			tProgramInfo?.uniformLocations.viewMatrix,
			false,
			this.viewMatrix,
		);
		gl.uniformMatrix4fv(
			// @ts-ignore
			tProgramInfo?.uniformLocations.modelMatrix,
			false,
			this.modelMatrix
		)
		gl.uniform1i(tProgramInfo?.uniformLocations.sampler, 0)

		// this.sBasic.bind();
	
		// // Set the shader uniforms
	
		// gl.uniformMatrix4fv(
		// 	bProgramInfo?.uniformLocations.projectionMatrix,
		// 	false,
		// 	projectionMatrix,
		// );
		// gl.uniformMatrix4fv(
		// 	bProgramInfo?.uniformLocations.viewMatrix,
		// 	false,
		// 	this.viewMatrix,
		// );
		// gl.uniformMatrix4fv(
		// 	bProgramInfo?.uniformLocations.modelMatrix,
		// 	false,
		// 	this.modelMatrix
		// )
		// gl.uniform4f(bProgramInfo?.uniformLocations.color, 1, 0.5, 0.3, 1);
		// this.draw()
		ugh(0)
	}

	draw(_delta: number) {
		const { gl } = this.canvas;

		gl.clearColor(0, 0, 0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// mat4.fromRotationTranslationScale(
		// 	this.modelMatrix, // destination matrix
		// 	quat.create(),
		// 	[mousePos.x - (this.rectangle.size.x / 2 * scale.x), 
		// 		mousePos.y - (this.rectangle.size.y / 2 * scale.y), 0.0],
		// 	[scale.x, scale.y, 0]
		// );

		// gl.uniformMatrix4fv(
		// 	programInfo.uniformLocations.modelMatrix,
		// 	false,
		// 	this.modelMatrix,
		// );
		// gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0)
		this.shapeTest.draw();

		
	}
}

function ugh(delta: number) {
	game.draw(delta)
	window.requestAnimationFrame(ugh)
}

let pos:Vec2 = {
	x: 0,
	y: 5
}

// let scale:Vec2 = {
// 	x: 1,
// 	y: 1
// }

1 + 1

const canvas = new Canvas(window.innerWidth, window.innerHeight);

let elem = document.getElementById('app');
if (elem == null) {
	alert("screaming screaming")
}
else{
	elem.appendChild(canvas.c);
}

const game = new Game(canvas);

let shaders:any = {};

Shader.Load("assets/Textured.shader").then((val)=>{
	shaders.textured = val;
	Shader.Load("assets/Basic.shader").then((val)=>{
		shaders.Basic = val;
		console.log(shaders);
		
		game.main();
	})
}).catch(()=>{alert("um oops")});



