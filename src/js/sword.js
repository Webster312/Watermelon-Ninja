

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let isDragging = false;
let dragX, dragY;

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);


// mouse events

function handleMouseDown(event) {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
  isDragging = true;
  startX = x;
  startY = y;
  animate();
}

function handleMouseMove(event) {
  if (isDragging) {
    dragX = event.clientX - canvas.offsetLeft;
    dragY = event.clientY - canvas.offsetTop;
  }
  console.log("Mouse position:", dragX, dragY);
}

function handleMouseUp(event) {
  isDragging = false;
}


// drag animations

function drawFlare(x, y, size, opacity) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0.5, Math.PI * 10, false);
    ctx.fillStyle = `rgba(255, 255, 0, ${opacity})`;
    ctx.fill();
  }


    //   check for collision function
function checkCollision(x1, y1, r1, x2, y2, r2) {
    //console.log("x1: " + x1 + ", y1: " + y1 + ", r1: " + r1 + ", x2: " + x2 + ", y2: " + y2 + ", r2: " + r2);
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < r1 + r2;
}



function animate() {
 
  if (isDragging) {
    for (let i = 0; i < 10; i++) {
        const size = i * 1.25;
        const opacity = 1 - i / 10;
        const x = dragX + Math.random() * 10 - 10;
        const y = dragY + Math.random() * 10 - 10;
        drawFlare(x, y, size, opacity);

        //check for collision
        const flareRadius = size;
        if  (checkCollision(x, y, flareRadius, dragX - canvas.offsetLeft, dragY - canvas.offsetTop, 10)) {
            console.log("collision detected");
        }
      }
    }

  requestAnimationFrame(animate);
}


