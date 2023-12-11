let size

function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size)
}

let frames = 200

function draw() {
  background(255, 125, 0)

  noFill()
  strokeWeight(10 * size / 200)

  let t = fract(frameCount / frames)

  let y1 = sinn(t)
  let y2 = sinn(t) * 0.5
  let y3 = sinn(t) * 0.5 + 0.25

  stroke(255, 0, 125)
  circle(0.25 * width, y1 * height, 0.15 * width)

  stroke(125, 0, 255)
  circle(0.5 * width, y2 * height, 0.15 * width)

  stroke(0, 125, 255)
  circle(0.75 * width, y3 * height, 0.15 * width)
}

function sinn(v) {
  return sin(PI * 2 * v) * 0.5 + 0.5
}