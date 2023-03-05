

window.onload = function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    function drawCircle(x, y) {
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2, false);
      ctx.fillStyle = "green";
      ctx.fill();
    }
    
    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    function animate() {
      clearCanvas();
      const x = randomInt(0, canvas.width);
      const y = randomInt(0, canvas.height);
      drawCircle(x, y);
      setTimeout(animate, 2000);
    }
    
    animate();
}