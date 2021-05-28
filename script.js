let App = {
    App.setup = function () {
        // The setup function initializes everything in a permanent way
        
        const canvas = document.createElement('canvas');

        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.dataToImageRatio = Math.max(this.width, this.height) / 1000;

        this.ctx.globalCompositeOperation = 'darker';

        this.ctx.imageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        this.xC = this.width / 2;
        this.yC = this.height / 2;

        document.getElementsByTagName('body')[0].appendChild(canvas);

        // Particle system properties
        this.lifespan = 300;
        this.popPerBirth = 5;
        this.maxPop = 1500;
        this.birthFreq = 1;
    }

    App.start = function () {
        // The start function sets, and potentially resets things that will change over time
        this.stepCount = 0;
        this.particles = [];

        // Counters for UI
        this.drawnInLastFrame = 0;
        this.deathCount = 0;

        // Initial paint (background most often)
        this.initDraw();
    }

    App.evolve = function () {
        let time1 = performance.now();
        this.stepCount++;

        // Use birth control
        if (this.stepCount % this.birthFreq == 0 && (this.particles.length + this.popPerBirth) < this.maxPop) {
            for (let n = 0; n < this.popPerBirth; n++) {
                this.birth();
            }
        }

        // Core sequence: Move Everything Then Draw Everything
        App.move();
        App.draw();

        let time2 = performance.now();
    }

    App.birth = function () {
        let x = -800 + 1600 * Math.random(),
            y = -800 + 1600 * Math.random();

        let particle = {
            hue: 195 + 3 * Math.floor(3 * Math.random()),
            sat: 65 + 30 * Math.random(),
            lum: 15 + Math.floor(50 * Math.random()),
            x,
            y,
            xLast: x, yLast: y,
            xSpeed: 0, ySpeed: 0,
            age: 0,
            name: 'seed-' + Math.ceil(10000000 * Math.random()) 
        }

        this.particles.push(particle)
    }

    App.kill = function (deadParticleName) {
        this.particles = this.particles.filter(p => p.name != deadParticleName)
    }

    App.move = function () {
        for (let i = 0; i < this.particles.length; i++) {
            // Get particle
            let p = this.particles[i];

            // Save last position
            p.xLast = p.x;
            p.yLast = p.y;

            // Reset velocity, as we're dealing with velocity fields and not forces
            p.xSpeed = 0; p.ySpeed = 0;

            // Eddies
            let eddies = [], baseK = 7;
            eddies.push({ x: -300, y: -300, K: 10 * baseK, r0: 180 })
            
        }
    }
}