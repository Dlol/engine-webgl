type Vec2 = {
	x: number;
	y: number;
};

type Vec3 = {
	x: number;
	y: number;
	z: number;
}

type Color = {
	r: number;
	g: number;
	b: number;
	a: number;
}

class Colors {
    /**
     * Makes a color from rgb values (0-255)
     * @param r red
     * @param g green
     * @param b blue
     * @returns the color
     */
    static fromRGB(r:number, g:number, b:number){
        return {
            r: r/255,
            g: g/255,
            b: b/255
        }
    }

	static get white(): Color{
		return {r:1, g:1, b:1, a:1};
	}

	static get black(): Color{
		return {r:0, g:0, b:0, a:1};
	}

    static get red(): Color{
        return {r:1, g:0, b:0, a:1};
    }

    static get green(): Color{
        return {r:0, g:1, b:0, a:1};
    }

    static get blue(): Color{
        return {r:0, g:0, b:1, a:1};
    }

    static get yellow(): Color{
        return {r:1, g:1, b:0, a:1};
    }

    static get cyan(): Color{
        return {r:0, g:1, b:1, a:1};
    }

    static get magenta(): Color{
        return {r:1, g:0, b:1, a:1};
    }
}