const UNIT_PLACEHOLDER_RADIUS = 5,
  UNIT_PIXELS_MOVE_RATE = 2;



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

  move() {
    if (this.goToX > this.x) {
      this.x += UNIT_PIXELS_MOVE_RATE;
    }
    if (this.goToX < this.x) {
      this.x -= UNIT_PIXELS_MOVE_RATE;
    }
    if (this.goToY > this.y) {
      this.y += UNIT_PIXELS_MOVE_RATE;
    }
    if (this.goToY < this.y) {
      this.y -= UNIT_PIXELS_MOVE_RATE;
    }
  }
}