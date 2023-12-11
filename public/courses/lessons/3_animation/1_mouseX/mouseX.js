let size

function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size)
}

function draw() {
  background(255, 125, 0)
  strokeWeight(50 * size / 200)

  let mX = mouseX / width

  let x1 = 0.25
  let y1 = 0.25

  let x2 = 0.75
  let y2 = 0.75

  stroke(255, 0, 125)
  line(
    x1 * width, y1 * height,
    x2 * width, y2 * height
  )
}