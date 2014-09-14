var canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

// Cross-browser support for requestAnimationFrame
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


function getRandomColor() {
    return '#'+'0123456789abcdef'.split('').map(function(v,i,a){
        return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');
}

var square = {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  fill: getRandomColor()
};


function renderSquare() {
    // ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(square.x,square.y,square.width,square.height);
    ctx.fillStyle = square.fill;
    ctx.fill();

    requestAnimationFrame(renderSquare);
}

function getMousePoint(e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

function main() {
    canvas.addEventListener('mousemove', function (e) {

        var point = getMousePoint(e);
        console.dir(point);
        square.x = point.x;
        square.y = point.y;
        square.fill = getRandomColor();
    });

    renderSquare();
}


main();
