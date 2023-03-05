const canvas = document.getElementById("canvas");
canvas.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(event) {
  const x = event.clientX;
  const y = event.clientY;
  console.log("Mouse position:", x, y);
}
