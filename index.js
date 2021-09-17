const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = (.75*window.innerWidth);
canvas.height = (.95*window.innerHeight);

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let isDrwaing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
let dataColor = "";

function draw(ev) {
  if (!isDrwaing) return; //this will return function when not moused down
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(ev.offsetX, ev.offsetY);
  ctx.stroke();
  [lastX, lastY] = [ev.offsetX, lastY = ev.offsetY];
  if (ev.shiftKey) {
    ctx.strokeStyle = "#FAEBD7";
  } else {   
    if (dataColor == "gradient") autoColor();
    else ctx.strokeStyle = dataColor;
  }
}

function autoColor() {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    if (hue >=360) hue = 0;
    hue++;

    if (ctx.lineWidth>100 || ctx.lineWidth <5) direction = !direction;
    if (direction) ctx.lineWidth++;
    else ctx.lineWidth--;
}

function setOffset(ev) {
  isDrwaing = true;
  [lastX, lastY] = [ev.offsetX, lastY = ev.offsetY]
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', setOffset);
canvas.addEventListener('mouseup', () => isDrwaing = false);
canvas.addEventListener('mouseout', () => isDrwaing = false);

canvas.addEventListener('wheel', e => {
  if(e.deltaY > 0) ctx.lineWidth -= 3;
  else if (e.deltaY < 0)ctx.lineWidth += 3;
})

function colorFunc(color) {
  dataColor = color.getAttribute("data-color");
}

function fontFunc(size) {
  ctx.lineWidth = size.getAttribute("data-size");
}

function penFunc() {

  let txtar =  document.getElementById("txtarea") ;
  txt = txtar.value;
  ctx.font = "normal 20px Arial";
  ctx.translate(10,20);
  ctx.fillText(txt,10,0);
  txtar.style.zIndex = "-1";
}

function writeFunc() {
  let txtar = document.getElementById("txtarea");
  txtar.style.zIndex = "+1";
}

