let size
function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size)
  colorMode(RGB, 1)
}

function draw() {
  background(1, 0.5, 0)
  strokeWeight(0.01 * size)
  strokeCap(SQUARE)

  let count = 100
  for (let i = 0; i < count; i++) {
    let iFract = i / count

    const red = iFract
    const green = 1 - iFract
    const blue = 0.5

    stroke(red, green, blue)

    let x1 = 0.1 + 0.8 * iFract
    let y1 = 0.1
    let x2 = x1
    let y2 = 0.1 + 0.8

    line(
      x1 * width, y1 * height,
      x2 * width, y2 * height
    )
  }
}