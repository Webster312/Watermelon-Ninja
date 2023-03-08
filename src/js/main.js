let score = 0;
let lives = 500000;
const circles = [];
let flare = [];

const watermelonImg = new Image();
watermelonImg.src = "src/main.css/images/watermelon.webp";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let isDragging = false;
let dragX, dragY;

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);

// creating the circles 'watermelon'
function drawCircle(x, y, size) {
  ctx.drawImage(watermelonImg, x - size, y - size, size * 3.25, size * 3.25);
}

// clearing the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// generating random circles
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 5) + min);
}

// creating the circles 'watermelons'
function createCircle() {
  const x = canvas.width / 2; //randomInt(5, canvas.width);
  const y = canvas.height - 50;
  const r = randomInt(25, 25);
  const vx = randomInt(-10, 5.5);
  const vy = randomInt(-6.5, -5.5);
  circles.push({ x, y, r, vx, vy });
  console.log(circles);
}

function updateCircle(circle) {
  circle.x += circle.vx;
  circle.y += circle.vy;
  circle.vy += 0.03625; //adjust this to change the gravity
}

// animating the circles
function animate() {
  clearCanvas();

  drawScore();
  drawLives();

  if (circles.length < 1) {
    // number of animating circles / watermelons
    createCircle();
  }

  circles.forEach((circle) => {
    updateCircle(circle);

    // check for collision with sword 'mouse'
    if (detectCollision(circle, dragX, dragY)) {
      score++;
      const index = circles.indexOf(circle);
      circles.splice(index, 1);
    } else if (circle.y > canvas.height) {
      const index = circles.indexOf(circle);
      circles.splice(index, 1);
      lives--;
    } else {
      drawCircle(circle.x, circle.y, circle.r);
    }
    //console.log(circles + circles.length + circle.x + circle.y);
  });

  // check if player has lost
  if (lives <= -0) {
    gameOver();
    return;
  }

  // adjust frame rate
  setTimeout(animate, 1000 / 75);
  //requestAnimationFrame(animate);
}

// detect collision
function detectCollision(circle, mouseX, mouseY) {
  const buffer = 80;
  const distance = Math.sqrt(
    Math.pow(circle.x - mouseX, 2) + Math.pow(circle.y - mouseY, 2)
  );
  return distance < circle.r;
}

function handleMouseMove(event) {
  if (isDragging) {
    dragX = event.clientX - canvas.offsetLeft;
    dragY = event.clientY - canvas.offsetTop;

    // draw flare circles
    let flareCircle = { x: dragX, y: dragY, r: 18, opacity: 1 };
    flare.push(flareCircle);
    for (let i = 0; i < flare.length; i++) {
      let circle = flare[i];
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(240, 240, 1, ${circle.opacity})`;
      ctx.fill();
      circle.opacity -= 0.05; // decrease opacity for next frame
      circle.r -= 0.2; // decrease radius for next frame
      if (circle.opacity <= 0) {
        flare.splice(i, 1); // remove circle when it becomes transparent
      }
    }

    // draw animated circle
    let radius = 8;
    ctx.beginPath();
    ctx.arc(dragX, dragY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(240, 1, 66, 0.8)";
    ctx.stroke();
    radius -= 5;
  }
}

function handleMouseUp() {
  isDragging = false;
}

function handleMouseDown() {
  isDragging = true;
}

// score function
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "36px papyrus";
  ctx.fillText("Score: " + score, 10, 35);
}

function drawLives() {
  ctx.fillStyle = "white";
  ctx.font = "40px papyrus";
  ctx.fillText(lives + ":Lives", 630, 35);
}

function gameOver() {
  // create link to game over page
  const gameOverLink = document.createElement("a");
  gameOverLink.href = "gameover.html";

  // add link to document
  document.body.appendChild(gameOverLink);

  // trigger click event to execute link
  gameOverLink.click();
}

animate();
