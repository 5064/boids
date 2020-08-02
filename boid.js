class Boid {
    position;
    velocity;
    acceleration;

    PERSEPTION_RADIUS = 100;
    MAX_SPEED = 3
    constructor(p5, pos, vel) {
        this.p5 = p5;
        this.position = this.p5.createVector(pos.x, pos.y);
        this.velocity = this.p5.createVector(vel.x, vel.y);
        this.accelaration = this.p5.createVector();
    }

    align = (boids) => {
        let totalBoids = 0;
        let average = this.p5.createVector();
        for (let boid of boids) {
            const d = this.p5.dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (d < this.PERSEPTION_RADIUS) {
                average.add(boid.velocity);
                totalBoids++;
            }
        }
        if (totalBoids !== 0) {
            average.div(totalBoids);  // now got average around Boids's velocity
        }
        average.setMag(this.MAX_SPEED)  // average is just direction, so unify magnitude
        average.sub(this.velocity);  // average - current velocity = smooth steering
        return average
    }

    cohesion = (boids) => {
        let totalBoids = 0;
        let average = this.p5.createVector();
        for (let boid of boids) {
            const d = this.p5.dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (d < this.PERSEPTION_RADIUS) {
                average.add(boid.position);
                totalBoids++;
            }
        }
        if (totalBoids !== 0) {
            average.div(totalBoids);  // now got average around Boids's position
        }
        average.setMag(this.MAX_SPEED)  // average is just direction, so unify magnitude
        average.sub(this.velocity);  // average - current position
        return average
    }

    flockRule = (boids) => {
        this.accelaration.mult(0)
        this.accelaration.add(this.align(boids), this.cohesion(boids))
    }

    update = () => {
        this.position.add(this.velocity);
        this.velocity.add(this.accelaration);
    }

    edgeLoop = () => {
        if (this.position.x > this.p5.width) {
            this.position.x = 0
        }
        if (this.position.y > this.p5.height) {
            this.position.y = 0
        }
        if (this.position.x < 0) {
            this.position.x = this.p5.width
        }
        if (this.position.y < 0) {
            this.position.y = this.p5.height
        }
    }

    show = () => {
        this.p5.push()
        this.p5.stroke(255)
        this.p5.strokeWeight(10);
        this.p5.point(this.position.x, this.position.y)
        this.p5.pop()
    }

}


