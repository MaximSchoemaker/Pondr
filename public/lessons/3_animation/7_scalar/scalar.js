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

  let x1 = sinn(t) * 0.5 + 0.25
  let x2 = sinn(t) * 0.5 + 0.25
  let x3 = sinn(t) * 0.5 + 0.25

  stroke(255, 0, 125)
  circle(x1 * width, 0.25 * height, 0.15 * width)

  stroke(125, 0, 255)
  circle(x2 * width, 0.5 * height, 0.15 * width)

  stroke(0, 125, 255)
  circle(x3 * width, 0.75 * height, 0.15 * width)
}

function sinn(v) {
  return sin(PI * 2 * v) * 0.5 + 0.5
}