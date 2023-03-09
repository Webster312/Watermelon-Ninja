let score = 0;
let lives = 3;
let flare = [];
const circles = [];
const collisionSound = new Audio(
  `./src/sound/ES_Water Splash Throw 1 - SFX Producer.mp3`
);
const sliceSound = new Audio(
  `./src/sound/ES_Whip Whoosh Swoosh 2 - SFX Producer.mp3`
);

const ninjaImg = new Image();
ninjaImg.src = "src/main.css/images/watermelon_ninja.webp";
const watermelonImg = new Image();
watermelonImg.src = "src/main.css/images/watermelon.webp";
const slicedWatermelonImg = new Image();
slicedWatermelonImg.src = "src/main.css/images/slicedWatermelon.png";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let isDragging = false;
let dragX, dragY;


canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);


// creating the circles 'watermelon'
function drawCircle(x, y, size) {
  ctx.drawImage(watermelonImg, x - size, y - size, size * 3.5, size * 3.5);
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
  const x = canvas.width / 5; //randomInt(5, canvas.width);
  const y = canvas.height - 45;
  const r = randomInt(25, 25);
  const vx = randomInt(-2, 2);
  const vy = randomInt(-7.5, -7);

  // Create 2 circles when score is between 10 and 19
  if (score >= 10 && score < 20) {
    const x1 = randomInt(r * 2, canvas.width - r * 2);
    const x2 = randomInt(r * 2, canvas.width - r * 2);
    circles.push({ x: x1, y: canvas.height - 45, r, vx, vy });
    circles.push({ x: x2, y: canvas.height - 45, r, vx, vy });
  }

  // Create 3 circles when score is 20 or higher
  else if (score >= 20) {
    const x1 = randomInt(r * 2, canvas.width / 3 - r * 2);
    const x2 = randomInt(
      canvas.width / 3 + r * 2,
      (canvas.width / 3) * 2 - r * 2
    );
    const x3 = randomInt((canvas.width / 3) * 2 + r * 2, canvas.width - r * 2);
    circles.push({ x: x1, y: canvas.height - 55, r, vx, vy });
    circles.push({ x: x2, y: canvas.height - 55, r, vx, vy });
    circles.push({ x: x3, y: canvas.height - 55, r, vx, vy });
  }

  // Create a single circle for all other scores
  else {
    const x = randomInt(r * 2, canvas.width - r * 2);
    circles.push({ x, y: canvas.height - 55, r, vx, vy });
  }

  console.log(circles);
}

function updateCircle(circle) {
  circle.x += circle.vx;
  circle.y += circle.vy;
  circle.vy += 0.0255; //adjust to change the gravity

  //check for collision with sidewalls
  if (circle.x - circle.r < 0){
    circle.x = circle.r;
    circle.vx = -circle.vx;
  } else if (circle.x + circle.r > canvas.width){
    circle.x = canvas.width - circle.r;
    circle.vx = -circle.vx;
  }
  if (circle.y - circle.r < 0 || circle.y + circle.r > canvas.height){
}
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

      // play collision sound
      collisionSound.play();
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
  setTimeout(animate, 1000 / 90);
  //requestAnimationFrame(animate);
}

// detect collision
function detectCollision(circle, mouseX, mouseY) {
  const buffer = 500;
  const distance = Math.sqrt(
    Math.pow(circle.x - mouseX, 2) + Math.pow(circle.y - mouseY, 2)
  );
  return distance < circle.r;
}

function handleMouseMove(event) {
  if (isDragging) {
    dragX = event.clientX - canvas.offsetLeft;
    dragY = event.clientY - canvas.offsetTop;
    // play slice sound
    sliceSound.play();
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
  ctx.font = "48px papyrus";
  ctx.fillText(score, 28, 490);
  ctx.drawImage(slicedWatermelonImg, 0, 395);
}

function drawLives() {
  ctx.fillStyle = "white";
  ctx.font = "40px papyrus";
  ctx.fillText(lives, 750, 490);
  ctx.drawImage(ninjaImg, 740, 400, 55, 55);
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
