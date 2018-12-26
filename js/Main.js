let canvas,
  canvasContext;

const FRAME_PER_SECOND = 30,
  ENEMY_START_UNITS = 15,
  PLAYER_START_UNITS = 20;

let playerUnits = [];
let enemyUnits = [];
let allUnits = [];
let testUnit = new Unit();



window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  setInterval(function () {
    moveEverething();
    drawEverething();
  }, 1000 / FRAME_PER_SECOND);

  canvas.addEventListener('mousemove', mouseMoveHandler)
  canvas.addEventListener('mousedown', mousedownHandler)
  canvas.addEventListener('mouseup', mouseupHandler)
  populateTeam(playerUnits, PLAYER_START_UNITS, true);
  populateTeam(enemyUnits, ENEMY_START_UNITS, false)
}

function drawEverething() {
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  for (let i = 0; i < allUnits.length; i++) {
    allUnits[i].draw();
  }

  for (let i = 0; i < selectedUnits.length; i++) {
    selectedUnits[i].drawSelectionBox();
  }
  if (isMouseDragging) {
    coloredOutlineRectCornerToCorner(lassoX1, lassoY1, lassoX2, lassoY2, 'yellow')
  }

}


function moveEverething() {

  for (let i = 0; i < allUnits.length; i++) {
    allUnits[i].move();
  }
  removeDeadUnits()
}


