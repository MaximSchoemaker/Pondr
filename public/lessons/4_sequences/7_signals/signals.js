let size
function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size)
}

let t
let frames = 500
function draw() {
  t = fract(frameCount / frames)

  background(255, 125, 0)
  strokeWeight(0.01 * size)
  noFill()

  let count = 25
  for (let i = 0; i < count; i++) {
    let iFract = i / (count - 1)

    const sig = sinn(iFract)

    let x = (0.1 + 0.8 * iFract)
    let y = (0.75 - sig * 0.5)
    let r = 0.025

    circle(x * width, y * height, r * size)
  }
}

function sinn(v) {
  return sin(PI * 2 * v) * 0.5 + 0.5
}

function tri(v) {
  return 1 - abs((1 - fract(v) * 2))
}