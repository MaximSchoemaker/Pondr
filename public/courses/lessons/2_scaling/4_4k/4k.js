let size = min(windowWidth, windowHeight)
createCanvas(size, size)

background(255, 125, 0)
strokeWeight(50)

stroke(255, 0, 125)
line(
  0.25 * width, 0.25 * height,
  0.75 * width, 0.75 * height
)

stroke(125, 0, 255)
line(
  0.75 * width, 0.25 * height,
  0.25 * width, 0.75 * height
)