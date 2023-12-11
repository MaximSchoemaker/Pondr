let size
function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size)
}

function draw() {
  background(255, 125, 0)
  strokeWeight(0.01 * size)

  let count = 10
  for (let i = 0; i < count; i++) {
    let iFract = i / count

    let x1 = i * 50
    let y1 = 0.1 * height
    let x2 = 0.1 * width
    let y2 = 0.9 * height

    line(x1, y1, x2, y2)
  }
}