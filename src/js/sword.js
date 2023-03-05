

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let isDragging = false;
let dragX, dragY;

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);

function handleMouseDown(event) {
    const x = event.clientX;
    const y = event.clientY;
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


