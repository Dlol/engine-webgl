import { Vec2 } from "./Types";

let mousePos: Vec2 = {
	x: 0,
	y: 0
}

let curkeys: object[] = [];
let mouseButton: boolean[] = [];

window.addEventListener("keydown", (e) => {
	curkeys[Number(e.keyCode)] = true;
	// console.log(curkeys);
});
window.addEventListener("keyup", (e) => {
	curkeys[Number(e.keyCode)] = false;
});
window.addEventListener("mousemove", (e)=>{
	mousePos.x = e.clientX;
	mousePos.y = e.clientY;
})
window.addEventListener("mousedown", (e) =>{
	mouseButton[e.button] = true;
})
window.addEventListener("mouseup", (e) =>{
	mouseButton[e.button] = false;
})

export { curkeys, mouseButton, mousePos }