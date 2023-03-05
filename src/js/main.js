

const watermelonImg = new Image();
watermelonImg.src = "src/main.css/images/watermelon.webp";

window.onload = function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const GRAVITY = 0.1125;
    
    const circles = [];


    // creating the circles 'watermelon'
    function drawCircle(x, y, size) {
         ctx.drawImage(watermelonImg, x-size, y-size, size*3.25, size*3.25);
    }
    
    // clearing the canvas
    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    // generating random circles
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    // animating the circles
   function createCircle() {
    const x = randomInt(0, canvas.width);
    const y = canvas.height;
    const r = randomInt(20, 20);
    const vx = randomInt(-5, 5.5);
    const vy = randomInt(-10.5, -6.5);
    circles.push({x, y, r, vx, vy});
  }

  function updateCircle(circle) {
    circle.x += circle.vx;
    circle.y += circle.vy;
    circle.vy += GRAVITY;
  }

  function animate() {
    clearCanvas();
    
    if (circles.length < 2) {       // number of animating circles
      createCircle();
    }
    
    circles.forEach(circle => {
      updateCircle(circle);
      if (circle.y > canvas.height) {
        const index = circles.indexOf(circle);
        circles.splice(index, 1);
      } else {
        drawCircle(circle.x, circle.y, circle.r);
      }
    });
    
    requestAnimationFrame(animate);
  }

  animate();
}






  