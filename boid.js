class Boid {
  position;
  velocity;
  acceleration;

  PERSEPTION_RADIUS = 70;
  MAX_SPEED = 3;
  MAX_FORCE = 0.1;
  constructor(p5, pos, vel) {
    this.p5 = p5;
    this.position = this.p5.createVector(pos.x, pos.y);
    this.velocity = this.p5.createVector(vel.x, vel.y);
    this.acceleration = this.p5.createVector();
  }

  align = (boids) => {
    let totalBoids = 0;
    let average = this.p5.createVector();
    for (let boid of boids) {
      const d = this.p5.dist(
        this.position.x,
        this.position.y,
        boid.position.x,
        boid.position.y
      );
      if (d < this.PERSEPTION_RADIUS) {
        average.add(boid.velocity);
        totalBoids++;
      }
    }
    if (totalBoids !== 0) {
      average.div(totalBoids); // now got average around Boids's velocity
      average.setMag(this.MAX_SPEED); // average is just direction, so unify magnitude
      average.sub(this.velocity); // desired - current velocity = steering
      average.limit(this.MAX_FORCE);
    }

    return average;
  };

  cohesion = (boids) => {
    let totalBoids = 0;
    let average = this.p5.createVector();
    for (let boid of boids) {
      const d = this.p5.dist(
        this.position.x,
        this.position.y,
        boid.position.x,
        boid.position.y
      );
      if (d !== 0 && d < this.PERSEPTION_RADIUS) {
        average.add(boid.position);
        totalBoids++;
      }
    }
    if (totalBoids !== 0) {
      average.div(totalBoids); // now got average around Boids's position
      average.sub(this.position);
      average.setMag(this.MAX_SPEED);
      average.sub(this.velocity); // average - current position
      average.limit(this.MAX_FORCE);
    }

    return average;
  };

  separate = (boids) => {
    let totalBoids = 0;
    let average = this.p5.createVector();
    for (let boid of boids) {
      const d = this.p5.dist(
        this.position.x,
        this.position.y,
        boid.position.x,
        boid.position.y
      );
      if (d !== 0 && d < this.PERSEPTION_RADIUS / 2) {
        let diff = this.p5
          .createVector(this.position.x, this.position.y)
          .sub(boid.position); // static method p5.Vector.sub()
        diff.div(d);
        average.add(diff);
        totalBoids++;
      }
    }
    if (totalBoids !== 0) {
      average.div(totalBoids); // now got average around Boids's position
      average.setMag(this.MAX_SPEED);
      average.sub(this.velocity); // average - current position
      average.limit(this.MAX_FORCE);
    }
    return average;
  };

  flockRule = (boids) => {
    this.acceleration.mult(0); // reset acceleration
    this.acceleration.add(this.align(boids));
    this.acceleration.add(this.cohesion(boids));
    this.acceleration.add(this.separate(boids));
  };

  update = () => {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
  };

  edgeLoop = () => {
    if (this.position.x > this.p5.width) {
      this.position.x = 0;
    }
    if (this.position.y > this.p5.height) {
      this.position.y = 0;
    }
    if (this.position.x < 0) {
      this.position.x += this.p5.width;
    }
    if (this.position.y < 0) {
      this.position.y += this.p5.height;
    }
  };

  show = () => {
    this.p5.push();
    this.p5.translate(this.position.x, this.position.y);
    // this.p5.line(0, 0, this.velocity.x * 15, this.velocity.y * 15);
    this.p5.rotate(Math.atan2(this.velocity.y, this.velocity.x));
    this.p5.fill(this.p5.color(`hsl(200, 60%, 60%)`));
    this.p5.quad(20, 0, 0, -7, -7, 0, 0, 7);
    this.p5.pop();
  };
}
