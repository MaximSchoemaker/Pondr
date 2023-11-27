let size
function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size)
}

function draw() {
  background(255, 125, 0)

  let count = 10
  for (let i = 0; i < count; i++) {
    let iFract = i / (count - 1)

    strokeWeight(0.01 * size)

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