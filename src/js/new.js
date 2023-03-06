

let score = 0;
const circles = [];


const watermelonImg = new Image();
watermelonImg.src = "src/main.css/images/watermelon.webp";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let isDragging = false;
let dragX, dragY;

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);

function drawCircle(x, y, size) {
  ctx.drawImage(watermelonImg, x - size, y - size, size * 3.25, size * 3.25);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createCircle() {
  const x = randomInt(0, canvas.width);
  const y = canvas.height;
  const r = randomInt(25, 25);
  const vx = randomInt(-5, 5.5);
  const vy = randomInt(-10.5, -6.5);
  circles.push({x, y, r, vx, vy});
}

function updateCircle(circle) {
  circle.x += circle.vx;
  circle.y += circle.vy;
  circle.vy += 0.1125;  //adjust this to change the gravity
}








function animate() {
  clearCanvas();

  if (circles.length < 1) {
    createCircle();
  }

  circles.forEach(circle => {
    updateCircle(circle);

    // check for collision with sword
    if (detectCollision(circle, dragX, dragY)) {
      score++;
      const index = circles.indexOf(circle);
      circles.splice(index, 1);
    } else if (circle.y > canvas.height) {
      const index = circles.indexOf(circle);
      circles.splice(index, 1);
    } else {
      drawCircle(circle.x, circle.y, circle.r);
    }
  });

  setTimeout(animate, 1000 / 90);
}




function detectCollision(circle, mouseX, mouseY) {
  const distance = Math.sqrt(Math.pow(circle.x - mouseX, 2) + Math.pow(circle.y - mouseY, 2));
  return distance < circle.r;
}

function handleMouseMove(event) {
  if (isDragging) {
    dragX = event.clientX - canvas.offsetLeft;
    dragY = event.clientY - canvas.offsetTop;
  };
}

function handleMouseUp(event) {
  isDragging = false;
}

function handleMouseDown(event) {
  isDragging = true;
}

animate();
