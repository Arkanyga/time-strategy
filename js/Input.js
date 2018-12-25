let lassoX1 = 0,
  lassoY1 = 0,
  lassoX2 = 0,
  lassoY2 = 0,
  isMouseDragging = false;
let selectedUnits = [];
const MIN_DIST_TO_COUNT_DRAG = 10,
  MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE = 12;

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


//
function getUnitUnderMouse(currentMousePos) {
  return findClosestUnitInRange(currentMousePos.x, currentMousePos.y, MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE, allUnits)
}


function mouseupHandler(e) {
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
    let clickedUnit = getUnitUnderMouse(mousePos);
    console.log(clickedUnit);

    if (clickedUnit !== null && clickedUnit.playerControlled === false) {
      for (let i = 0; i < selectedUnits.length; i++) {
        selectedUnits[i].setTarget(clickedUnit);
      }

    } else {
      let unitsAlongSide = Math.floor(Math.sqrt(selectedUnits.length + 2))//добавляем 2 чтобы floor не скинул допустим 7 до 2 рядов или при3 юнитах чтобы было 2 ряда а не 1
      for (let i = 0; i < selectedUnits.length; i++) {
        selectedUnits[i].goToNear(mousePos.x, mousePos.y, i, unitsAlongSide);
      }
    }

  }

}

function mousedownHandler(e) {
  let mousePos = calculateMousePos(e);
  lassoX1 = mousePos.x;
  lassoY1 = mousePos.y;
  lassoX2 = lassoX1;
  lassoY2 = lassoY1;
  isMouseDragging = true;
}

function mouseMoveHandler(e) {
  let mousePos = calculateMousePos(e);
  document.getElementById('debugText').innerHTML = 'x: ' + mousePos.x + ' y: ' + mousePos.y;
  if (isMouseDragging) {
    lassoX2 = mousePos.x;
    lassoY2 = mousePos.y;

  }
}