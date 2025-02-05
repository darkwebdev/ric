console.log('dust.js is running');

const canvas = document.getElementById('dustCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;
const minSpeed = 1; // Minimum speed of the particles
const maxSpeed = 5; // Maximum speed of the particles
const minSize = 1; // Minimum size of the particles
const maxSize = 3; // Maximum size of the particles

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (maxSize - minSize) + minSize; // Random size between minSize and maxSize
        const speedFactor = this.size / maxSize; // Speed factor based on size
        this.speedX = -Math.abs((Math.random() * (maxSpeed - minSpeed) + minSpeed) * speedFactor); // Ensure negative speedX
        this.speedY = Math.random() < 0.8 ? -Math.abs((Math.random() * (maxSpeed - minSpeed) + minSpeed) * speedFactor) : 0; // Increase probability for diagonal movement
        const greyShade = Math.floor(Math.random() * 256);
        this.color = `rgba(${greyShade}, ${greyShade}, ${greyShade}, 0.8)`;
        this.shape = Math.floor(Math.random() * 3); // Random shape: 0 - square, 1 - pentagon, 2 - hexagon
        this.width = this.size * (Math.random() * 0.5 + 0.75);
        this.height = this.size * (Math.random() * 0.5 + 0.75);
        this.polygonSides = this.shape === 1 ? 5 : this.shape === 2 ? 6 : 0;
        this.vertices = this.calculateVertices();
    }

    calculateVertices() {
        const vertices = [];
        if (this.shape === 0) {
            vertices.push({ x: -this.width / 2, y: -this.height / 2 });
            vertices.push({ x: this.width / 2, y: -this.height / 2 });
            vertices.push({ x: this.width / 2, y: this.height / 2 });
            vertices.push({ x: -this.width / 2, y: this.height / 2 });
        } else {
            const angle = (Math.PI * 2) / this.polygonSides;
            for (let i = 0; i < this.polygonSides; i++) {
                const radius = this.size * (Math.random() * 0.5 + 0.75);
                vertices.push({
                    x: radius * Math.cos(angle * i),
                    y: radius * Math.sin(angle * i)
                });
            }
        }
        return vertices;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset position if particle moves off the left edge
        if (this.x + this.size < 0) {
            this.x = canvas.width + this.size;
            this.y = Math.random() * canvas.height;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.vertices[0].x, this.y + this.vertices[0].y);
        for (let i = 1; i < this.vertices.length; i++) {
            ctx.lineTo(this.x + this.vertices[i].x, this.y + this.vertices[i].y);
        }
        ctx.closePath();
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
