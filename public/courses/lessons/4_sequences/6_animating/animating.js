let size
function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size)
}

let t
let frames = 100
function draw() {
  t = fract(frameCount / frames)

  background(255, 125, 0)

  let count = 25
  for (let i = 0; i < count; i++) {
    let iFract = i / (count - 1)

    strokeWeight(0.01 * size * sinn(iFract + t))

    const red = iFract
    const green = 1 - iFract
    const blue = 0.5

    stroke(red * 255, green * 255, blue * 255)

    let x1 = 0.1 + 0.8 * iFract
    let y1 = 0.1
    let x2 = 0.1
    let y2 = 0.1 + 0.8 * iFract

    line(
      x1 * width, y1 * height,
      x2 * width, y2 * height
    )
    line(
      (1 - x1) * width, (1 - y1) * height,
      (1 - x2) * width, (1 - y2) * height
    )
  }
}

function sinn(v) {
  return sin(PI * 2 * v) * 0.5 + 0.5
}

function tri(v) {
  return 1 - abs((1 - fract(v) * 2))
}