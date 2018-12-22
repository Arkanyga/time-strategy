let canvas,
  canvasContext,
  FRAME_PER_SECOND = 30,
  PLAYER_START_UNITS = 8;

let playerUnits = [];
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
    for (let i = 0; i < playerUnits.length; i++) {
      playerUnits[i].goToX = mousePos.x;
      playerUnits[i].goToY = mousePos.y;
    }

  })

  for (let i = 0; i < PLAYER_START_UNITS; i++) {
    let spawnUnit = new Unit();
    spawnUnit.reset();
    playerUnits.push(spawnUnit);
  }

}

function drawEverething() {
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  for (let i = 0; i < playerUnits.length; i++) {
    playerUnits[i].draw();
  }
}


function moveEverething() {
  for (let i = 0; i < playerUnits.length; i++) {
    playerUnits[i].move();
  }
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



