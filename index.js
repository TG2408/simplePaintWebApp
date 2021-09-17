const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';


let isDrwaing = false;
let lastX = 0;
let lastY = 0;

function draw(ev) {
  if (!isDrwaing) return; //this will return function when not moused down
  console.log(ev);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(ev.offsetX, ev.offsetY);
  ctx.stroke();
  lastX = ev.offsetX;
  lastY = ev.offsetY;
}

function setOffset(ev) {
    isDrwaing = true;
    lastX = ev.offsetX;
    lastY = ev.offsetY;
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', setOffset /*() => isDrwaing = true*/);
canvas.addEventListener('mouseup', () => isDrwaing = false);
canvas.addEventListener('mouseout', () => isDrwaing = false);