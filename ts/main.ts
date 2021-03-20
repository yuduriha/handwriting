let canvas:HTMLCanvasElement;
let context:CanvasRenderingContext2D|null;
let oldTouch = {x:0, y:0};
window.onload = () => {
	canvas = <HTMLCanvasElement>document.getElementById("canvas-handwriting");
	context = canvas.getContext('2d'),
	addTouchEvent();
	resetCanvas();
}

/**
 * タッチイベント購読
 */
function addTouchEvent() : void {
	document.addEventListener('touchstart', function(event) {
		let touch = event.touches[0];
		if(!!touch) {
			oldTouch.x = touch.pageX;
			oldTouch.y = touch.pageY;
		}
	}, {passive: false});
	document.addEventListener('touchmove', function(event: TouchEvent) {
		event.preventDefault();
		let touch = event.touches[0];
		if(!!touch && !!context) {
			drawLine(context, {x: oldTouch.x, y: oldTouch.y}, {x: touch.pageX, y: touch.pageY}, {lineSize: 10})
			oldTouch.x = touch.pageX;
			oldTouch.y = touch.pageY;
		}
	}, {passive: false});
}

/**
 * キャンバスリセットボタン
 */
function onTapResetCanvas() : void {
	resetCanvas();
}

/**
 * キャンバスを現在の画面サイズに合わせる
 */
function resetCanvas() : void {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight * 2;

	if(context != null) {
		let DELTA = 60;
		for(let y = DELTA; y < canvas.height; y += DELTA) {
			drawLine(context, {x: 0, y: y}, {x: canvas.width, y: y}, {color:"rgb(192, 192, 192)"});
		}
	}
}

/**
 * 直線描画
 */
var drawLine = function(ctx: CanvasRenderingContext2D, from: {x: number, y: number}, to: {x: number, y: number}, option?: {color?:string, lineSize?: number}) {
	if(option && option.color) {
		ctx.strokeStyle = option.color;
	} else {
		ctx.strokeStyle = "rgb(0, 0, 0)";
	}

	if(option && option.lineSize) {
		ctx.lineWidth = option.lineSize;
	} else {
		ctx.lineWidth = 1;
	}

	ctx.lineJoin="round";
	ctx.lineCap="round";
	ctx.beginPath();
	ctx.moveTo(from.x, from.y);
	ctx.lineTo(to.x, to.y);
	ctx.closePath();
	ctx.stroke();
	ctx.strokeStyle = "rgb(0, 0, 0)";
};