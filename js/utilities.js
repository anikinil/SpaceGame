// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(Math.abs(x1 -  x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
}

function getSpeed(radius) {
  if (radius < 10) {
    speed = 2 + (Math.random() * 2);
  } else if (radius >= 10 && radius < 15) {
    speed = 5 + (Math.random() * 2);
  } else if (radius >= 15) {
    speed = 8 + (Math.random() * 2);
  }

  return speed;
}
