let size

function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size)
}

let frames = 100

function draw() {
  background(255, 125, 0)
  strokeWeight(50 * size / 200)

  let t = fract(frameCount / frames)

  let x1 = t
  let y1 = 0.25

  let x2 = 1 - t
  let y2 = 0.75

  stroke(255, 0, 125)
  line(
    x1 * width, y1 * height,
    x2 * width, y2 * height
  )

  stroke(125, 0, 255)
  line(
    (1 - x1) * width, y1 * height,
    (1 - x2) * width, y2 * height
  )
}

function sinn(v) {
  return sin(PI * 2 * v) * 0.5 + 0.5
}