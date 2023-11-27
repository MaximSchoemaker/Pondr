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

  let r1 = sinn(t)
  let r2 = sinn(t)
  let r3 = sinn(t)

  stroke(255, 0, 125)
  circle(0.5 * width, 0.5 * height, r1 * width)

  stroke(125, 0, 255)
  circle(0.5 * width, 0.5 * height, r2 * width)

  stroke(0, 125, 255)
  circle(0.5 * width, 0.5 * height, r3 * width)
}

function sinn(v) {
  return sin(PI * 2 * v) * 0.5 + 0.5
}