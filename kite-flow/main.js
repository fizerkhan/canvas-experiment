(function(window) {

	var points = [],
			numPoints = 250,
			bounce = -1,
			particleSize = [];

  var canvas = document.getElementById("myCanvas"),
  		width = window.innerWidth,
  		height = window.innerHeight,
  		context = canvas.getContext("2d");

  context.canvas.width = width;
  context.canvas.height = height;

  window.addEventListener('resize', function() {
    width = window.innerWidth;
    height = window.innerHeight;
    context.canvas.width = width;
    context.canvas.height = height;
  });

  for(var i = 0; i < numPoints; i += 1) {
    points.push({
    	x:Math.random() * width,
      y:Math.random() * height,
      vx:Math.random() * 0.5 - 0.25,
      vy:Math.random() * 0.5 - 0.25
    });
    particleSize.push( Math.random() * 10);
  }

  function drawCircle(x, y, length, scheme) {

    var fillA, fillB, fillC;

    if (scheme === "kite-a") {
      fillB = "#FFC60C";
      fillA = "#3B5998";
      fillC = "#45B326";
    } else if (scheme === "kite-b") {
      fillB = "#FFC60C";
      fillA = "#3B5998";
      fillC = "#45B326";
    } else if (scheme === "kite-c") {
      fillB = "#FFC60C";
      fillA = "#45B326";
      fillC = "#3B5998";
    }

    context.beginPath();
    context.rect(x, y, length*3, length*3);
    context.fillStyle=fillA;
    context.fill();
    context.closePath();
    context.beginPath();
    context.rect(x, y, length*2, length*2);
    context.fillStyle=fillB;
    context.fill();
    context.closePath();
    context.beginPath();
    context.rect(x, y, length, length);
    context.fillStyle=fillC;
    context.fill();
    context.closePath();
		context.beginPath();
		context.moveTo(x+(length*3),y+(length*3));
		//context.lineTo(x+(length*3)+12,y+(length*3)+12);
		// quadratic curve
    context.quadraticCurveTo(120, 710, 920, 720);

		context.strokeStyle='rgba(0,0,0,0.25)';
		context.lineWidth = 1;
		context.stroke();
		context.closePath();
  }


  function update() {
      var i, point;

      for(i = 0; i < numPoints; i += 1) {

          point = points[i];
          point.x += point.vx * 12;
          point.y += point.vy * 12;

          if( point.x >= width ) {
              point.x = width;
              point.vx *= bounce;
          }
          else if(point.x <= 0) {
              point.x = 0;
              point.vx *= bounce;
          }
          if(point.y > height) {
              point.y = height;
              point.vy *= bounce;
          }
          else if(point.y < 0) {
              point.y = 0;
              point.vy *= bounce;
          }
      }

    draw();

  }

  function draw() {
      context.clearRect(0, 0, width, height);
      var i, point, sides = 6, a = ((Math.PI * 2)/sides);
      for(i = 0; i < numPoints; i += 1) {
          point = points[i];
          var size = particleSize[i];
          if (i < 50) {
            drawCircle(point.x, point.y, size, "kite-a");
          }
          if (i > 100 && i < 120 ) {
            drawCircle(point.x, point.y, size, "kite-b");
          }
          if (i > 280 && i < 300 ) {
            drawCircle(point.x, point.y, size, "kite-c");
          }
      }
  }

	// Cross-browser support for requestAnimationFrame
	window.requestAnimationFrame = (function () {
			return window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					function (callback) {
							window.setTimeout(callback, 1000 / 60);
					};
	})();

  function render () {
    update();
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

})(window);
