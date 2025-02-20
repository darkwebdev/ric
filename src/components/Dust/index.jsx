import React, { useEffect, useRef } from 'react';
import { useResize } from '../../hooks/useResize.js';
import './style.css';

const smokeParticleCount = 300;
const dustParticleCount = 50;
const smokeSpreadFactor = -2;
const smokeAngleFactor = 1;
const smokeOpacityFactor = 0.05;
const smokeSpeedFactor = 2;
const smokeSizeFactor = 1.5;
const smokeSizeChangeFactor = 1.001;
const smokeFadeFactor = 0.08;
const dustMinSpeed = 1;
const dustMaxSpeed = 5;
const dustMinSize = 1;
const dustMaxSize = 3;

class SmokeParticle {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = canvas.width + 100;
        this.y = canvas.height - 50;
        this.size = (Math.random() * 20 + 10) * smokeSizeFactor;
        const angle = (Math.random() * smokeAngleFactor) - smokeAngleFactor / 2;
        const randomSpeedFactor = Math.random() * 0.5 + 0.75;
        this.speedY = Math.sin(angle) * smokeSpreadFactor * smokeSpeedFactor * randomSpeedFactor;
        this.speedX = Math.cos(angle) * smokeSpreadFactor * smokeSpeedFactor * randomSpeedFactor;
        this.opacity = (Math.random() * 0.5 + 0.5) * smokeOpacityFactor;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.size *= smokeSizeChangeFactor;
        this.opacity -= 0.01 * smokeOpacityFactor * smokeFadeFactor;
    }

    draw() {
        this.ctx.fillStyle = `rgba(150, 150, 150, ${this.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

class DustParticle {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * canvas.width + canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (dustMaxSize - dustMinSize) + dustMinSize;
        const speedFactor = this.size / dustMaxSize;
        this.speedX = -Math.abs((Math.random() * (dustMaxSpeed - dustMinSpeed) + dustMinSpeed) * speedFactor);
        this.speedY = Math.random() < 0.8 ? -Math.abs((Math.random() * (dustMaxSpeed - dustMinSpeed) + dustMinSpeed) * speedFactor) : 0;
        const greyShade = Math.floor(Math.random() * 256);
        this.color = `rgba(${greyShade}, ${greyShade}, ${greyShade}, 0.8)`;
        this.shape = Math.floor(Math.random() * 3);
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
        if (this.x + this.size < 0) {
            this.x = this.canvas.width + this.size;
            this.y = Math.random() * this.canvas.height;
        }
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + this.vertices[0].x, this.y + this.vertices[0].y);
        for (let i = 1; i < this.vertices.length; i++) {
            this.ctx.lineTo(this.x + this.vertices[i].x, this.y + this.vertices[i].y);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
}

export const Dust = () => {
    const canvasRef = useRef(null);
    const smokeParticles = useRef([]);
    const dustParticles = useRef([]);
    const { width, height } = useResize();

    useEffect(() => {
        canvasRef.current.width = width;
        canvasRef.current.height = height
    }, [width, height]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        function init() {
            for (let i = 0; i < smokeParticleCount; i++) {
                smokeParticles.current.push(new SmokeParticle(canvas, ctx));
            }
            for (let i = 0; i < dustParticleCount; i++) {
                dustParticles.current.push(new DustParticle(canvas, ctx));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            smokeParticles.current.forEach((particle, index) => {
                particle.update();
                particle.draw();
                if (particle.size < 0.5 || particle.opacity < 0) {
                    smokeParticles.current.splice(index, 1);
                }
            });
            dustParticles.current.forEach(particle => {
                particle.update();
                particle.draw();
            });
            for (let i = 0; i < 2; i++) {
                smokeParticles.current.push(new SmokeParticle(canvas, ctx));
            }
            requestAnimationFrame(animate);
        }

        init();
        animate();
    }, []);

    return <canvas ref={canvasRef} id="dustCanvas" />;
};

export default Dust;
