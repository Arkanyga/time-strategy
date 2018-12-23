const UNIT_PLACEHOLDER_RADIUS = 5,
  UNIT_MAX_RAND_DIST_FROM_WALK_TARGET = 50,
  UNIT_PIXELS_MOVE_RATE = 2,
  UNIT_SELECT_DIM_HALF = UNIT_PIXELS_MOVE_RATE + 6;



class Unit {
  constructor() {
    this.x;
    this.y;
    this.idDead = false;
  }
  reset() {
    this.x = Math.random() * canvas.width / 4;
    this.y = Math.random() * canvas.height / 4;

    this.goToX = this.x;
    this.goToY = this.y;
  }

  draw() {
    if (!this.isDead) {
      colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, 'white')
    }
  }

  drawSelectionBox() {
    coloredOutlineRectCornerToCorner(this.x - UNIT_SELECT_DIM_HALF,
      this.y - UNIT_SELECT_DIM_HALF,
      this.x + UNIT_SELECT_DIM_HALF,
      this.y + UNIT_SELECT_DIM_HALF, 'yellow');
  }

  move() {
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

  goToNear(aroundX, aroundY) {
    this.goToX = aroundX + Math.random() * UNIT_MAX_RAND_DIST_FROM_WALK_TARGET;
    this.goToY = aroundY + Math.random() * UNIT_MAX_RAND_DIST_FROM_WALK_TARGET;

  }

  //число находится между двумя числами если произведение их разницы будет отрицательным
  //пример [1,5] цифра чтобы доказать что 3 между ними 
  //1-3 * 5-3 < 0 значит цифра 3 между ними
  isInBox(x1, y1, x2, y2) {
    return (this.x - x1) * (this.x - x2) < 0 && (this.y - y1) * (this.y - y2) < 0
  }
}