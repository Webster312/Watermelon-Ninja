let score = 0;
let lives = 3;
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
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// creating the circles 'watermelons'
function createCircle() {
  const x = canvas.width / 2; //randomInt(5, canvas.width);
  const y = canvas.height - 50;
  const r = randomInt(25, 25);
  const vx = randomInt(-10, 6.5);
  const vy = randomInt(-8.5, -8.5);
  circles.push({ x, y, r, vx, vy });
  console.log(circles);
}

function updateCircle(circle) {
  circle.x += circle.vx;
  circle.y += circle.vy;
  circle.vy += 0.1125; //adjust this to change the gravity
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
  if (lives <= -1) {
    gameOver();
    return;
  }

  // adjust frame rate
  setTimeout(animate, 1000 / 75);
  //requestAnimationFrame(animate);
}

// detect collision
function detectCollision(circle, mouseX, mouseY) {
  const buffer = 25;
  const distance = Math.sqrt(
    Math.pow(circle.x - mouseX, 2) + Math.pow(circle.y - mouseY, 2)
  );
  return distance < circle.r;
}

function handleMouseMove(event) {
  if (isDragging) {
    dragX = event.clientX - canvas.offsetLeft;
    dragY = event.clientY - canvas.offsetTop;
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
  ctx.fillText("Score: " + score, 10, 30);
}

function drawLives() {
  ctx.fillStyle = "white";
  ctx.font = "40px papyrus";
  ctx.fillText(lives + ":Lives", 575, 35);
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

/*


// drag animations

function drawFlare(x, y, size, opacity) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0.5, Math.PI * 10, false);
    ctx.fillStyle = `rgba(255, 255, 0, ${opacity})`;
    ctx.fill();
  }



function animate() {
 
  if (isDragging) {
    for (let i = 0; i < 10; i++) {
        const size = i * 1.25;
        const opacity = 1 - i / 10;
        const x = dragX + Math.random() * 10 - 10;
        const y = dragY + Math.random() * 10 - 10;
        drawFlare(x, y, size, opacity);

       
      }
    }

  requestAnimationFrame(animate);
}

*/
