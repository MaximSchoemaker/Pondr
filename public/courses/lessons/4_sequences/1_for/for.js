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

    let x1 = i * 50
    let y1 = 50
    let x2 = 0
    let y2 = height - 50

    line(x1, y1, x2, y2)
  }
}