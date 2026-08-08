import React, { useEffect, useRef } from 'react';

export default function SparkleCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor(x, y, isTouch = false) {
                this.x = x || Math.random() * canvas.width;
                this.y = y || Math.random() * canvas.height;
                this.size = Math.random() * (isTouch ? 9 : 4.5) + 2;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * -1.5 - 0.5;
                this.color = `hsl(${Math.random() * 60 + 320}, 100%, 75%)`;
                this.alpha = 1;
                this.decay = Math.random() * 0.015 + 0.006;
                this.isHeart = Math.random() > 0.35;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.alpha -= this.decay;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = Math.max(0, this.alpha);
                ctx.fillStyle = this.color;
                if (this.isHeart) {
                    ctx.beginPath();
                    const d = this.size;
                    ctx.moveTo(this.x, this.y);
                    ctx.bezierCurveTo(this.x - d/2, this.y - d/2, this.x - d, this.y + d/3, this.x, this.y + d);
                    ctx.bezierCurveTo(this.x + d, this.y + d/3, this.x + d/2, this.y - d/2, this.x, this.y);
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        }

        for (let i = 0; i < 40; i++) {
            particles.push(new Particle());
        }

        const handlePointerMove = (e) => {
            for (let i = 0; i < 2; i++) {
                particles.push(new Particle(e.clientX, e.clientY, true));
            }
        };
        window.addEventListener('pointermove', handlePointerMove);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (particles.length < 35) {
                particles.push(new Particle());
            }
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].alpha <= 0) {
                    particles.splice(i, 1);
                }
            }
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('pointermove', handlePointerMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1
            }}
        />
    );
}
