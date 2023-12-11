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

  let count = 10
  for (let i = 0; i < count; i++) {
    let iFract = i / count
    let iFractNext = (i + 1) / count

    const radius = 0.25

    const angle1 = iFract
    let x1 = 0.5 + scos(angle1) * radius
    let y1 = 0.5 + ssin(angle1) * radius

    const angle2 = iFractNext
    let x2 = 0.5 + scos(angle2) * radius
    let y2 = 0.5 + ssin(angle2) * radius

    line(x1 * width, y1 * height, x2 * width, y2 * height)
  }
}

function ssin(v) {
  return sin(PI * 2 * v)
}

function scos(v) {
  return cos(PI * 2 * v)
}
