class Texture{
	gl: WebGL2RenderingContext;
	texture: WebGLTexture;
	constructor(url: string, canvas: Canvas){
		const { gl } = canvas;
		this.gl = gl;
		
		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);

		// temp image while we wait
		const level = 0;
		const internalFormat = gl.RGBA;
		const dimen:Vec2 = {x:1, y:1};
		const border = 0;
		const srcFormat = gl.RGBA;
		const srcType = gl.UNSIGNED_BYTE;
		const pixel = new Uint8Array([255, 0, 255, 255]); // magenta
		gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, dimen.x, dimen.y, border, srcFormat, srcType, pixel);

		const image = new Image();
		image.onload = () => {
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

			// decide to generate mipmaps
			if (this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
				gl.generateMipmap(gl.TEXTURE_2D);
			}
			else {
				// turn off mips
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			}
		};

		image.src = url;
	}
	private isPowerOf2(val:number) {
		return (val & (val - 1)) == 0;
	}
}

