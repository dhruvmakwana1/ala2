const canvas = document.getElementById("bubbleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bubblesArray = [];
const numBubbles = 150;

// Random color generator with transparency
function randomRGBA() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const a = Math.random() * 0.3 + 0.1;
    return `rgba(${r},${g},${b},${a})`;
}

// Bubble class to handle each bubble's properties and movement
class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100; // Start below the screen
        this.radius = Math.random() * 20 + 10;
        this.color = randomRGBA();
        this.speed = Math.random() * 2 + 1;
        this.horizontalShift = Math.random() * 0.5 - 0.25; // Slight horizontal drift
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.y -= this.speed; // Move upwards
        this.x += this.horizontalShift; // Drift sideways

        // Respawn bubble at the bottom once it goes off screen
        if (this.y + this.radius < 0) {
            this.y = canvas.height + this.radius;
            this.x = Math.random() * canvas.width;
            this.color = randomRGBA(); // Refresh color for uniqueness
            this.speed = Math.random() * 2 + 1;
        }

        this.draw();
    }
}

// Initialize bubbles array with Bubble instances
function init() {
    bubblesArray = [];
    for (let i = 0; i < numBubbles; i++) {
        bubblesArray.push(new Bubble());
    }
}
init();

// Animate bubbles by updating their position
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubblesArray.forEach(bubble => bubble.update());
    requestAnimationFrame(animate);
}
animate();

// Resize canvas on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});