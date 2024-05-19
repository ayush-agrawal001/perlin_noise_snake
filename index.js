// Import the noise function from the perlin-noise library
import { noise } from '@chriscourses/perlin-noise'

// Generate a noise value for z (returns value between 0 and 1)
const z = noise(10)

// Import the dat.GUI library for creating a graphical user interface
import * as dat from 'dat.gui';

// Create a new GUI instance
const gui = new dat.GUI();

// Define an object to hold the quantity value
const qty = {
    q: 500
}

// Add a folder to the GUI for the quantity and add a slider to adjust it
const qtyFolder = gui.addFolder("qty")
qtyFolder.add(qty, "q", 100, 2000, 100)

// Select the canvas element from the DOM
var canvas = document.querySelector("canvas");

// Set the canvas height and width to match the window size
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Add an event listener to resize the canvas when the window is resized
window.addEventListener("resize", event => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

// Get the 2D drawing context for the canvas
var c = canvas.getContext("2d");

// Define a Circle constructor function
function Circle(x, y, offset, colors) {
    this.x = x;
    this.y = y;
    this.offset = offset;
    this.colors = colors;

    // Update the circle's position using noise values and redraw it
    this.update = () => {  
        this.x = noise(time + 20 + this.offset) * canvas.width;    
        this.y = noise(time + this.offset) * canvas.height;    
        this.draw();    
    }

    // Draw the circle on the canvas
    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
        c.fillStyle = this.colors;
        c.fill();
        c.strokeStyle = "black";
        c.stroke();
    }
}

// Define an array of colors in HSL format
const colors = [
    'hsl(0, 100%, 50%)',       // Red
    'hsl(30, 100%, 50%)',      // Orange
    'hsl(60, 100%, 50%)',      // Yellow
    'hsl(120, 100%, 50%)',     // Green
    'hsl(180, 100%, 50%)',     // Cyan
    'hsl(240, 100%, 50%)',     // Blue
    'hsl(270, 100%, 50%)',     // Purple
    'hsl(300, 100%, 50%)',     // Magenta
    'hsl(330, 100%, 50%)'      // Pink
];

console.log(colors);

// Create an array to hold the circle objects
const circles = [];

// Populate the circles array with Circle instances
for (let i = 0; i < qty.q; i++) {
    circles.push(new Circle(canvas.width / 2, canvas.height / 2, i * 0.01, colors[Math.floor(Math.random() * colors.length)]));
}
console.log(circles)

// Initialize the time variable for the animation
var time = 0;

// Define the animation function
function animate() {
    requestAnimationFrame(animate);

    // Clear the canvas with a semi-transparent black rectangle
    c.fillStyle = "rgba(0,0,0,0.1)"
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Update each circle in the circles array
    circles.forEach((circle) => {
        circle.update();
    })

    // Increment the time variable
    time += 0.01;
}

// Start the animation
animate();
