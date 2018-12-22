let canvas,
  canvasContext,
  FRAME_PER_SECOND = 30;


let testUnit = new Unit();


window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  setInterval(function () {
    moveEverething();
    drawEverething();
  }, 1000 / FRAME_PER_SECOND);

  canvas.addEventListener('mousemove', function (e) {
    let mousePos = calculateMousePos(e);
    document.getElementById('debugText').innerHTML = 'x: ' + mousePos.x + ' y: ' + mousePos.y;
  })
  canvas.addEventListener('click', function (e) {
    let mousePos = calculateMousePos(e);
    testUnit.goToX = mousePos.x;
    testUnit.goToY = mousePos.y;
  })
  testUnit.reset();
}

function drawEverething() {
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  testUnit.draw()
}


function moveEverething() {
  testUnit.move();
}

function calculateMousePos(e) {
  let rect = canvas.getBoundingClientRect(), root = document.documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft;
  let mouseY = e.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  }
}



