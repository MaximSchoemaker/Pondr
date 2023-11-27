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

  let count = 24
  for (let i = 0; i < count; i++) {
    let iFract = i / count

    const radius = 0.25
    const angle = iFract

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
