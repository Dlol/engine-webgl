// basically importing but in pre es2016 ig
// const { mat2, mat3, mat4, vec2, vec3, vec4 } = glMatrix;
import {mat4} from 'gl-matrix-ts'

import { mouseButton, mousePos } from "./Events";
import Canvas from "./Canvas";
import Shader from "./Shader";
import { Rectangle } from './Shapes';
import { Vec2, Colors } from "./Types";

class Cell {
	enabled: boolean;
	canvas: Canvas;
	pos: Vec2;
	dimen: Vec2;
	tile: Rectangle;

	constructor(canvas:Canvas, pos:Vec2, dimensions:Vec2, shader: Shader) {
		this.enabled = false;
		this.canvas = canvas;
		this.pos = pos;
		this.dimen = dimensions;
		this.tile = new Rectangle(pos, dimensions, canvas.c, canvas.gl, Colors.white, shader);
	}

	draw(){
		if (this.enabled) {
			this.tile.color = Colors.white;
		}
		else{
			this.tile.color = Colors.black;
		}

		this.tile.draw();
	}
}

class Game{
	canvas: any;
	shader: Shader | undefined;
	rectangle: Rectangle | undefined;
	buffers: any;
	modelMatrix: any;
	viewMatrix: any;
	grid: Cell[];
	counter: number;
	gridDimen: any;
	// shapeTest: Shape;
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
		this.shader = new Shader(canvas);
		this.shader.initShaderProgram(shaders.vert, shaders.frag);
	
		this.shader.addAttribLoc("vertexPosition", "aVertexPosition");
		this.shader.addUniformLoc("projectionMatrix", "uProjectionMatrix");
		this.shader.addUniformLoc("viewMatrix", "uViewMatrix");
		this.shader.addUniformLoc("modelMatrix", "uModelMatrix");
		this.shader.addUniformLoc("color", "uColor");
		console.log(this.shader.programInfo);

		this.grid = [];
		this.gridDimen = {
			x: 32,
			y: 18
		} 
		let frac:Vec2 = {
			x: canvas.c.width / this.gridDimen.x,
			y: canvas.c.height / this.gridDimen.y
		} 
		for (let index = 0; index < this.gridDimen.x * this.gridDimen.y; index++) {
			this.grid.push(new Cell(
				this.canvas,
				{x: (index % this.gridDimen.x) * frac.x, y: Math.floor(index/this.gridDimen.x) * frac.y}, 
				{x: frac.x - 4, y: frac.y - 4}, this.shader));
			// console.table({x: (index % gridDimen.x) * frac.x, y: Math.floor(index/gridDimen.y) * frac.y});	
		}
		

		// this.shapeTest = new TextureRect({x:20, y:20}, {x:20, y:20}, canvas.c, canvas.gl, Colors.red, this.shader, true);
	
		// console.log(shader);
	
		// Draw the scene
		if (this.shader.programInfo == null || this.shader == null) {
			alert("screaming screaming this.main()")
		} else {
			this.drawScene();
		}
	}


	drawScene() {

		const { gl } = this.canvas;
		const programInfo = this.shader?.programInfo;
		const buffers = this.buffers;
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
	
		gl.useProgram(programInfo?.program);
	
		// Set the shader uniforms
	
		gl.uniformMatrix4fv(
			programInfo?.uniformLocations.projectionMatrix,
			false,
			projectionMatrix,
		);
		gl.uniformMatrix4fv(
			programInfo?.uniformLocations.viewMatrix,
			false,
			this.viewMatrix,
		);
		gl.uniformMatrix4fv(
			// @ts-ignore
			programInfo?.uniformLocations.modelMatrix,
			false,
			this.modelMatrix
		)
		gl.uniform4f(programInfo?.uniformLocations.color, 1, 0.5, 0.3, 1);
		// this.draw()
		ugh(0)
	}

	draw(_delta: number) {
		// console.log(this);
		const { gl } = this.canvas;
		// const programInfo = this.shader.programInfo;

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
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

		let index = Math.floor(mousePos.x / canvas.c.clientWidth * this.gridDimen.x) + (Math.floor(mousePos.y / canvas.c.clientHeight * this.gridDimen.y) * this.gridDimen.x)
		// console.log(index);

		if (mouseButton[0]) {
			this.grid[index].enabled = true;
		}
		if (mouseButton[2]) {
			this.grid[index].enabled = false;
		}

		this.grid.forEach(element => {
			element.draw();
		});

		// this.shapeTest.draw();

		
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

let scale:Vec2 = {
	x: 1,
	y: 1
}


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
// (async () => {
// 	let shaderResponse = await fetch("assets/Basic.shader")

// 	let shaderSource = await shaderResponse.text();
	
// 	let sources = shaderSource.split(">>");
// 	sources.forEach(element => {
// 		if (element == '') {
// 			return;
// 		}
// 		console.log(element);
// 		let trimmed = element.replace('\r\n', '\n');
// 		let type = trimmed.slice(0, trimmed.indexOf("<<"));
// 		let source = trimmed.substring(trimmed.indexOf("<<") + 2);
// 		shaders[type.toLowerCase()] = source;
// 	})
	
// 	console.log(shaders);
// 	game.main()
// }) ();

Shader.Load("assets/Basic.shader").then((val)=>{
	shaders = val;
	console.log(shaders);
	
	game.main();
}).catch(()=>{alert("um oops")});



