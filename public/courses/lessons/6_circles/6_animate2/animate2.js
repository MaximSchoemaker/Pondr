let size
function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size)
  colorMode(RGB, 1)
}

let t
const frames = 100
function draw() {
  t = fract(frameCount / frames)

  background(1, 0.5, 0)
  strokeWeight(0.01 * size)
  noFill()

  let count = 15
  for (let i = 0; i < count; i++) {
    let iFract = i / count
    let iFractNext = (i + 1) / count

    let p1 = coordinates(iFract)
    let p2 = coordinates(iFractNext)

    line(
      p1.x * width, p1.y * height,
      p2.x * width, p2.y * height
    )
  }
}

function coordinates(angle) {
  const radius = 0.125 + sinn(angle * 3 + t) * 0.25

  let x = 0.5 + scos(angle) * radius
  let y = 0.5 + ssin(angle) * radius

  return { x, y }
}

function tri(v) {
  return 1 - abs((1 - fract(v) * 2))
}

function sinn(v) {
  return ssin(v) * 0.5 + 0.5
}

function ssin(v) {
  return sin(PI * 2 * v)
}

function scos(v) {
  return cos(PI * 2 * v)
}
