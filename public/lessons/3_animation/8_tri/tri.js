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

  let x1 = tri(t)
  let x2 = tri(t + 0.33)
  let x3 = tri(t + 0.66)

  let y1 = 0.25
  let y2 = 0.5
  let y3 = 0.75

  let r1 = sinn(t + 0.33) * 0.25
  let r2 = sinn(t + 0.66) * 0.25
  let r3 = sinn(t) * 0.25

  stroke(255, 0, 125)
  circle(x1 * width, y1 * height, r1 * width)

  stroke(125, 0, 255)
  circle(x2 * width, y2 * height, r2 * width)

  stroke(0, 125, 255)
  circle(x3 * width, y3 * height, r3 * width)
}

function sinn(v) {
  return sin(PI * 2 * v) * 0.5 + 0.5
}

function tri(v) {
  return 1 - abs((1 - fract(v) * 2))
}