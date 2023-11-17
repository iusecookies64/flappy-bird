function explode(x, y, canvasWidth, canvasHeight, color, color2, context)
{
    let maxSpeed = 2.5;
    let particles = [];
    let particleCount = 100;
    let maxRadius = 3;
    for(let i = 0; i < particleCount; i++)
    {
        let particle = {
            x: x,
            y: y,
            vx: (Math.random() * maxSpeed) - (maxSpeed / 2),
            vy: (Math.random() * maxSpeed) - (maxSpeed / 2),
            radius: Math.floor(Math.random() * maxRadius),
        }

        particles.push(particle);
    }

    let animationId = setInterval(function()
    {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        for(let i = 0; i < particleCount; i++)
        {
            let particle = particles[i];
            if(i < 70) context.fillStyle = `${color}`;
            else context.fillStyle = color2;
            context.beginPath();
            particle.x += particle.vx;
            particle.y += particle.vy;
            if(particle.vx > 0) particle.vx -= 0.01;
            else particle.vx += 0.01;
            if(particle.vy > 0) particle.vy -= 0.01;
            else particle.vy += 0.01;
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }, 15);
    setTimeout(function(){
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        clearInterval(animationId)
    }, 750);
}

