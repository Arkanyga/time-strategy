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

  isInBox(leftX, topY, rightX, bottomY) {
    if (this.x < leftX) {
      console.log(123);

      return false;
    }
    if (this.x > rightX) {
      console.log(123);

      return false;
    }
    if (this.y < topY) {
      console.log(123);

      return false;
    }
    if (this.y > bottomY) {
      console.log(123);

      return false;
    }
    return true;
  }
}