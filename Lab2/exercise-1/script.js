
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


ctx.fillStyle = "#af4ca0ff";
ctx.fillRect(20, 20, 120, 80);


ctx.beginPath();
ctx.arc(250, 80, 40, 0, Math.PI * 2);
ctx.fillStyle = "#b9ff22ff";
ctx.fill();
ctx.closePath();


ctx.beginPath();
ctx.moveTo(20, 200);
ctx.lineTo(480, 200);
ctx.strokeStyle = "#00d9ffff";
ctx.lineWidth = 3;
ctx.stroke();
ctx.closePath();


ctx.font = "24px Arial";
ctx.fillStyle = "#000";
ctx.fillText("HTML5 Canvas", 150, 260);