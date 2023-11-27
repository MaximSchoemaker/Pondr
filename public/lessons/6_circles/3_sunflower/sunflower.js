const PHI = (1 + Math.sqrt(5)) / 2

let size
function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size)
  colorMode(RGB, 1)
}

function draw() {
  background(1, 0.5, 0)
  strokeWeight(0.01 * size)
  noFill()

  let count = 100
  for (let i = 0; i < count; i++) {
    let iFract = i / count

    const radius = iFract * 0.4
    const angle = i * PHI

    let x = 0.5 + scos(angle) * radius
    let y = 0.5 + ssin(angle) * radius
    let r = 0.025

    circle(x * width, y * height, r * size)
  }
}

function ssin(v) {
  return sin(PI * 2 * v)
}

function scos(v) {
  return cos(PI * 2 * v)
}
