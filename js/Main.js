let canvas,
  canvasContext,
  FRAME_PER_SECOND = 30,
  PLAYER_START_UNITS = 8;

let playerUnits = [];
let selectedUnits = [];
let testUnit = new Unit();
let lassoX1 = 0,
  lassoY1 = 0,
  lassoX2 = 0,
  lassoY2 = 0,
  isMouseDragging = false;


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
    if (isMouseDragging) {
      lassoX2 = mousePos.x;
      lassoY2 = mousePos.y;
      console.log(lassoX2, lassoY2);

    }
  })
  // canvas.addEventListener('click', function (e) {
  //   let mousePos = calculateMousePos(e);
  //   for (let i = 0; i < playerUnits.length; i++) {
  //     playerUnits[i].goToNear(mousePos.x, mousePos.y);
  //   }

  // })
  canvas.addEventListener('mousedown', function (e) {
    let mousePos = calculateMousePos(e);
    lassoX1 = mousePos.x;
    lassoY1 = mousePos.y;
    lassoX2 = lassoX1;
    lassoY2 = lassoY1;
    isMouseDragging = true;
  })

  canvas.addEventListener('mouseup', function (e) {
    isMouseDragging = false;
    selectedUnits = [];
    for (let i = 0; i < playerUnits.length; i++) {
      if (playerUnits[i].isInBox(lassoX1, lassoY1, lassoX2, lassoY2)) {
        console.log(123);

        selectedUnits.push(playerUnits[i]);
      }
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
  for (let i = 0; i < selectedUnits.length; i++) {
    selectedUnits[i].drawSelectionBox();
  }
  if (isMouseDragging) {
    coloredOutlineRectCornerToCorner(lassoX1, lassoY1, lassoX2, lassoY2, 'yellow')
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



