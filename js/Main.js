let canvas,
  canvasContext;

const FRAME_PER_SECOND = 30,
  MIN_DIST_TO_COUNT_DRAG = 10,
  PLAYER_START_UNITS = 20;

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
    if (mouseMovedEnoughToTreatAsDrag()) {
      selectedUnits = [];
      for (let i = 0; i < playerUnits.length; i++) {
        if (playerUnits[i].isInBox(lassoX1, lassoY1, lassoX2, lassoY2)) {
          selectedUnits.push(playerUnits[i]);
        }
      }
    } else {
      let mousePos = calculateMousePos(e);
      let unitsAlongSide = Math.floor(Math.sqrt(selectedUnits.length + 2))//добавляем 2 чтобы floor не скинул допустим 7 до 2 рядов или при3 юнитах чтобы было 2 ряда а не 1
      for (let i = 0; i < selectedUnits.length; i++) {
        selectedUnits[i].goToNear(mousePos.x, mousePos.y, i, unitsAlongSide);
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

function mouseMovedEnoughToTreatAsDrag() {
  let diffX = lassoX1 - lassoX2;
  let diffY = lassoY1 - lassoY2;
  let dragDist = Math.sqrt(diffX * diffX + diffY * diffY);
  return (dragDist > MIN_DIST_TO_COUNT_DRAG)
}


