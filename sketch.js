const Sketch = new p5((p5) => {
    const CANVAS_X = 1000,
        CANVAS_Y = 600;

    const MAX_NUM = 50;
    const boids = [];

    prepareBoids = () => {
        for (let i = 0; i < MAX_NUM; i++) {
            const randomRad = p5.TWO_PI * Math.random();
            const b = new Boid(
                p5,
                { x: Math.random() * CANVAS_X, y: Math.random() * CANVAS_Y },
                { x: Math.cos(randomRad) * 4, y: Math.sin(randomRad) * 4 }
            )
            boids.push(b);
        }
    }

    p5.setup = () => {
        p5.createCanvas(CANVAS_X, CANVAS_Y);
        prepareBoids();
    }

    p5.draw = () => {
        p5.background(100);
        for (let boid of boids) {
            boid.edgeLoop();
            boid.flockRule(boids);
            boid.update();
            boid.show();
        }
    }
})

