let size

function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size)
}

let frames = 100

function draw() {
  background(255, 125, 0)
  strokeWeight(50 * size / 200)
  stroke(125, 0, 255)

  let t = frameCount / frames

  let x1 = t
  let y1 = 0.25

  let x2 = 0.75
  let y2 = 0.75

  line(
    x1 * width, y1 * height,
    x2 * width, y2 * height
  )

  line(
    (1 - x1) * width, y1 * height,
    (1 - x2) * width, y2 * height
  )
}