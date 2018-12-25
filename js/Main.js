let canvas,
  canvasContext;

const FRAME_PER_SECOND = 30,
  ENEMY_START_UNITS = 15,
  PLAYER_START_UNITS = 20;

let playerUnits = [];
let enemyUnits = [];
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

  for (let i = 0; i < PLAYER_START_UNITS; i++) {
    let spawnUnit = new Unit();
    spawnUnit.resetAndSetPlayerTeam(true)
    playerUnits.push(spawnUnit);
  }
  for (let i = 0; i < ENEMY_START_UNITS; i++) {
    let spawnUnit = new Unit();
    spawnUnit.resetAndSetPlayerTeam(false)
    enemyUnits.push(spawnUnit);
  }
}

function drawEverething() {
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  for (let i = 0; i < playerUnits.length; i++) {
    playerUnits[i].draw();
  }
  for (let i = 0; i < enemyUnits.length; i++) {
    enemyUnits[i].draw();
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
  for (let i = 0; i < enemyUnits.length; i++) {
    enemyUnits[i].move();
  }
}




