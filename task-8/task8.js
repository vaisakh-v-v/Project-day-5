let data = {
  Jan: 10,
  Feb: 21,
  Mar: 22,
  Apr: 23,
  May: 21,
  Jun: 24,
  July: 25,
  Aug: 30,
  Sept: 26,
  Oct: 28,
  Nov: 29,
  Dec: 6,
};

const canvas = document.getElementById("canvas");
const canvasWidth = 800;
const canvasHeight = 800;
const padding = 20;
const numberOfGridLines = 11;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
let cnt = canvas.getContext("2d");

function drawLine(cnt, startX, startY, endX, endY, color) {
  cnt.save();
  cnt.strokeStyle = color;
  cnt.beginPath();
  cnt.moveTo(startX, startY);
  cnt.lineTo(endX, endY);
  cnt.stroke();
  cnt.restore();
}
function drawBar(cnt, upperLeftX, upperLeftY, width, height, color) {
    cnt.save();
    cnt.fillStyle = color;
    cnt.fillRect(upperLeftX, upperLeftY, width, height);
    cnt.restore();
}

let gap = (canvasHeight - padding) / numberOfGridLines;
let maximumValue = Math.max(...Object.values(data));
let incrementGrid = Math.ceil(maximumValue / (numberOfGridLines - 1));
let barHeight = canvasHeight - padding;

function drawGrids() {
  drawLine(cnt, padding, canvasHeight, "black");
  let value = 0;
  for (let i = 0; i < numberOfGridLines; i++) {
    let y = canvasHeight - padding - i * gap;
    cnt.fillText(value, padding - 15, y - 5);
    value += incrementGrid;
    drawLine(cnt, 0, y, canvasWidth, y, "black");
  }
}
drawGrids();
let increment = (canvasWidth - padding) / 13;
let width = increment - 20;
let obj = {};

function drawGraph(month, percent, gapInBar) {
  let value = data[month];
  let ratio = barHeight / numberOfGridLines / incrementGrid;
  let y = value * ratio;
  if (percent < 100) {
    percent++;
    requestAnimationFrame(function () {
      drawGraph(month, percent, gapInBar);
    });
  }
  let rectangle = new Path2D();
  rectangle.rect(gapInBar, barHeight - y, width, y);
  obj[month] = {
    rectangle: rectangle,
    x: gapInBar,
    y: barHeight - y,
  };
  let newHeight = (y * percent) / 100;
  drawBar(cnt, gapInBar, barHeight - newHeight, width, newHeight, "green");
}
function drawGraphs() {
  let gapInBar = padding + increment;
  for (const month in data) {
    let percent = 0;
    drawGraph(month, percent, gapInBar);
    cnt.fillText(month, gapInBar + 10, canvasHeight - 5);
    gapInBar += increment;
  }
}
drawGraphs();
const toolTip = document.querySelector(".toolTip");
canvas.addEventListener("mousemove", (event) => {
  for (const month in obj) {
    if (cnt.isPointInPath(obj[month].rectangle, event.offsetX, event.offsetY)) {
      toolTip.style.top = `${obj[month].y + padding}px`;
      toolTip.style.left = `${obj[month].x + 5}px`;
      toolTip.textContent = data[month];
    }
  }
});
const linkElement = document.querySelector("button");
linkElement.addEventListener("click", (event) => {
  let url = canvas.toDataURL("image/png");
  linkElement.querySelector("a").href = url;
});
