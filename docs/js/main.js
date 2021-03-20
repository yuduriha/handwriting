"use strict";
var canvas;
var context;
var oldTouch = { x: 0, y: 0 };
window.onload = function () {
    canvas = document.getElementById("canvas-handwriting");
    context = canvas.getContext('2d'),
        addTouchEvent();
    resetCanvas();
};
function addTouchEvent() {
    document.addEventListener('touchstart', function (event) {
        var touch = event.touches[0];
        if (!!touch) {
            oldTouch.x = touch.pageX;
            oldTouch.y = touch.pageY;
        }
    }, { passive: false });
    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
        var touch = event.touches[0];
        if (!!touch && !!context) {
            drawLine(context, { x: oldTouch.x, y: oldTouch.y }, { x: touch.pageX, y: touch.pageY }, { lineSize: 10 });
            oldTouch.x = touch.pageX;
            oldTouch.y = touch.pageY;
        }
    }, { passive: false });
}
function onTapResetCanvas() {
    resetCanvas();
}
function resetCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 2;
    if (context != null) {
        var DELTA = 60;
        for (var y = DELTA; y < canvas.height; y += DELTA) {
            drawLine(context, { x: 0, y: y }, { x: canvas.width, y: y }, { color: "rgb(192, 192, 192)" });
        }
    }
}
var drawLine = function (ctx, from, to, option) {
    if (option && option.color) {
        ctx.strokeStyle = option.color;
    }
    else {
        ctx.strokeStyle = "rgb(0, 0, 0)";
    }
    if (option && option.lineSize) {
        ctx.lineWidth = option.lineSize;
    }
    else {
        ctx.lineWidth = 1;
    }
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = "rgb(0, 0, 0)";
};
