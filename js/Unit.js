const UNIT_PLACEHOLDER_RADIUS = 5,
  UNIT_MAX_RAND_DIST_FROM_WALK_TARGET = 50,
  UNIT_PIXELS_MOVE_RATE = 2,
  UNIT_ATTACK_RANGE = 55,
  UNIT_AI_ATTACK_INITIATE = UNIT_ATTACK_RANGE + 10,
  UNIT_RANKS_SPACING = UNIT_PLACEHOLDER_RADIUS * 3,
  UNIT_SELECT_DIM_HALF = UNIT_PIXELS_MOVE_RATE + 6;



class Unit {
  constructor() {
    this.x;
    this.y;
    this.idDead = false;
    this.unitColor;
  }

  resetAndSetPlayerTeam(playerTeam) {
    this.myTarget = null;
    this.playerControlled = playerTeam;
    this.x = Math.random() * canvas.width / 4;
    this.y = Math.random() * canvas.height / 4;
    if (!this.playerControlled) {
      this.x = canvas.width - this.x;
      this.y = canvas.height - this.y;
      this.unitColor = 'red';
    } else {
      this.unitColor = 'white';
    }
    this.idDead = false;
    this.goToX = this.x;
    this.goToY = this.y;
  }

  draw() {
    if (!this.isDead) {
      colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, this.unitColor)
    }
  }

  drawSelectionBox() {
    coloredOutlineRectCornerToCorner(this.x - UNIT_SELECT_DIM_HALF,
      this.y - UNIT_SELECT_DIM_HALF,
      this.x + UNIT_SELECT_DIM_HALF,
      this.y + UNIT_SELECT_DIM_HALF, 'yellow');
  }

  move() {
    if (this.myTarget !== null) {
      if (this.myTarget.isDead) {
        this.myTarget = null;
        this.goToX = this.x;
        this.goToY = this.y;
      } else if (this.distFrom(this.myTarget.x, this.myTarget.y) > UNIT_ATTACK_RANGE) {
        this.goToX = this.myTarget.x;
        this.goToY = this.myTarget.y;
      } else {
        this.myTarget.isDead = true;
        this.goToX = this.x;
        this.goToY = this.y;
      }
    } else if (this.playerControlled === false) {
      if (Math.random() < 0.02) {
        let nearestOpponentFound = findClosestUnitInRange(this.x, this.y, UNIT_AI_ATTACK_INITIATE, playerUnits);
        if (nearestOpponentFound !== null) {
          this.myTarget = nearestOpponentFound;
        } else {
          this.goToX = this.x - Math.random() * 70;
          this.goToY = this.y - Math.random() * 70;
        }


      }
    }

    let deltaX = this.goToX - this.x;
    let deltaY = this.goToY - this.y;
    let distToGo = Math.sqrt(deltaY * deltaY + deltaX * deltaX);
    let moveX = UNIT_PIXELS_MOVE_RATE * deltaX / distToGo;
    let moveY = UNIT_PIXELS_MOVE_RATE * deltaY / distToGo;
    if (distToGo > UNIT_PIXELS_MOVE_RATE) {
      this.x += moveX;
      this.y += moveY;
    } else {
      this.x = this.goToX;
      this.y = this.goToY;
    }

  }

  goToNear(aroundX, aroundY, formationPos, formationDim) {
    let colNum = formationPos % formationDim;
    let rowNum = Math.floor(formationPos / formationDim);
    this.goToX = aroundX + colNum * UNIT_RANKS_SPACING;
    this.goToY = aroundY + rowNum * UNIT_RANKS_SPACING;

  }

  //число находится между двумя числами если произведение их разницы будет отрицательным
  //пример [1,5] цифра чтобы доказать что 3 между ними 
  //1-3 * 5-3 < 0 значит цифра 3 между ними
  isInBox(x1, y1, x2, y2) {
    return (this.x - x1) * (this.x - x2) < 0 && (this.y - y1) * (this.y - y2) < 0
  }

  distFrom(otherX, otherY) {
    let deltaX = otherX - this.x;
    let deltaY = otherY - this.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  }

  setTarget(newTarget) {
    this.myTarget = newTarget;
  }
}