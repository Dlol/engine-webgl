import {Vec2, Color, Colors} from "./Types";
import Shader from "./Shader";
import { VertexBuffer, IndexBuffer } from "./Buffers";
import Texture from "./Texture";
import Canvas from "./Canvas";

interface Shape{
	position: Vec2;
	size: Vec2;
	canvas: HTMLCanvasElement;
	ctx: WebGLRenderingContext;
	color: Color;
	shader: Shader;
	draw(): void;
}
class Rectangle implements Shape{
	position: Vec2;
	size: Vec2;
	canvas: HTMLCanvasElement;
	ctx: WebGLRenderingContext;
	color: Color;
	shader: Shader;
	vb: VertexBuffer;
	ib: IndexBuffer;

	constructor(pos: Vec2, size: Vec2, canvas: HTMLCanvasElement, ctx: WebGLRenderingContext, color: Color, shader: Shader, dynamic:boolean = false) {
		this.position = pos;
		this.size = size;
		this.canvas = canvas;
		this.ctx = ctx;
		this.color = color;
		this.shader = shader;
		let positions = [
			0 + pos.x, 0 + pos.y,
			1 * size.x + pos.x, 0 + pos.y,
			0 + pos.x, 1 * size.y + pos.y,
			1 * size.x + pos.x, 1 * size.y + pos.y
		]
		let idx = [
			0, 1, 2,
			3, 1, 2
		]
		let type = ctx.STATIC_DRAW;
		if (dynamic) {
			type = ctx.DYNAMIC_DRAW;
		}
		this.ib = new IndexBuffer(idx, ctx, type);
		this.vb = new VertexBuffer(positions, ctx, type);
	}

	draw():void {
		const {programInfo} = this.shader;
		this.shader.bind();
		this.ctx.uniform4f(programInfo?.uniformLocations.color, this.color.r, this.color.g, this.color.b, this.color.a);
		this.ib.bind();
		this.vb.bind();

		const numComponents = 2;
		const type = this.ctx.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;
		this.ctx.vertexAttribPointer(
			programInfo?.attribLocations.vertexPosition,
			numComponents,
			type,
			normalize,
			stride,
			offset,
		);
		this.ctx.enableVertexAttribArray(programInfo?.attribLocations.vertexPosition);
		this.ctx.drawElements(this.ctx.TRIANGLES, 6, this.ctx.UNSIGNED_BYTE, 0)
	}
}

class Triangle implements Shape {
	position: Vec2;
	size: Vec2;
	canvas: HTMLCanvasElement;
	ctx: WebGLRenderingContext;
	color: Color;
	shader: Shader;
	ib: IndexBuffer;
	vb: VertexBuffer;
	constructor(pos: Vec2, size: Vec2, canvas: HTMLCanvasElement, ctx: WebGLRenderingContext, color: Color, shader: Shader, dynamic:boolean = false) {
		this.position = pos;
		this.size = size;
		this.canvas = canvas;
		this.ctx = ctx;
		this.color = color;
		this.shader = shader;
		let positions = [
			0 + pos.x, 1 * size.y + pos.y,
			1 * size.x + pos.x, 1 * size.y + pos.y,
			1 * size.x * 0.5 + pos.x, 0 + pos.y
		]
		let idx = [
			0, 1, 2
		]
		let type = ctx.STATIC_DRAW;
		if (dynamic) {
			type = ctx.DYNAMIC_DRAW;
		}
		this.ib = new IndexBuffer(idx, ctx, type);
		this.vb = new VertexBuffer(positions, ctx, type);
	}
	draw():void {
		const {programInfo} = this.shader;
		this.shader.bind();
		this.ctx.uniform4f(programInfo?.uniformLocations.color, this.color.r, this.color.g, this.color.b, this.color.a);
		this.ib.bind();
		this.vb.bind();

		const numComponents = 2;
		const type = this.ctx.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;
		this.ctx.vertexAttribPointer(
			programInfo?.attribLocations.vertexPosition,
			numComponents,
			type,
			normalize,
			stride,
			offset,
		);
		this.ctx.enableVertexAttribArray(programInfo?.attribLocations.vertexPosition);
		this.ctx.drawElements(this.ctx.TRIANGLES, 3, this.ctx.UNSIGNED_BYTE, 0)
	}
}


class TextureRect implements Shape{
	position: Vec2;
	size: Vec2;
	canvas: Canvas;
	ctx: WebGLRenderingContext;
	color: Color;
	shader: Shader;
	vb: VertexBuffer;
	ib: IndexBuffer;
	texture: Texture;

	constructor(pos: Vec2, size: Vec2, canvas: Canvas, ctx: WebGLRenderingContext, texUrl: string, shader: Shader, dynamic:boolean = false) {
		this.color = Colors.transparent;
		this.position = pos;
		this.size = size;
		this.canvas = canvas;
		this.ctx
		this.ctx = ctx;
		this.shader = shader;
		this.texture = new Texture(texUrl, canvas);
		let positions = [
			0 + pos.x, 0 + pos.y, 0, 0,
			1 * size.x + pos.x, 0 + pos.y, 1, 0,
			0 + pos.x, 1 * size.y + pos.y, 0, 1,
			1 * size.x + pos.x, 1 * size.y + pos.y,	1, 1
		]
		let idx = [
			0, 1, 2,
			3, 1, 2
		]
		let type = ctx.STATIC_DRAW;
		if (dynamic) {
			type = ctx.DYNAMIC_DRAW;
		}
		this.ib = new IndexBuffer(idx, ctx, type);
		this.vb = new VertexBuffer(positions, ctx, type);
	}

	draw():void {
		const {programInfo} = this.shader;
		this.shader.bind();
		this.ib.bind();
		this.vb.bind();
		this.texture.bind();

		const numComponents = 2;
		const type = this.ctx.FLOAT;
		const normalize = false;
		const stride = 24;
		const offset = 0;
		this.ctx.vertexAttribPointer(
			programInfo?.attribLocations.vertexPosition,
			numComponents,
			type,
			normalize,
			stride,
			offset,
		);
		
		this.ctx.enableVertexAttribArray(programInfo?.attribLocations.vertexPosition);

		this.ctx.vertexAttribPointer(
			programInfo?.attribLocations.texPosition,
			2, this.ctx.FLOAT, true, 12, 24
		);
		this.ctx.enableVertexAttribArray(programInfo?.attribLocations.texPosition);

		this.ctx.drawElements(this.ctx.TRIANGLES, 6, this.ctx.UNSIGNED_BYTE, 0)
	}
}

export { Shape, Rectangle, Triangle, TextureRect };