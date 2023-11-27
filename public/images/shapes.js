
function setup() {
  createCanvas(40, 25);
}

function draw() {
  background(0, 0, 0, 0);
  const weight = 3;
  strokeWeight(weight);
  stroke("white");

  for (let i = 0; i < 100; i++) {
    const x1 = i / 100;
    const x2 = (i + 1) / 100;
    const y1 = tri(x1); //sinn(x1);
    const y2 = tri(x2); //sinn(x2);

    line(
      x1 * (width - weight * 2) + weight,
      y1 * (height - weight * 2) + weight,
      x2 * (width - weight * 2) + weight,
      y2 * (height - weight * 2) + weight
    );
  }
}

function sinn(v) {
  return sin(PI * 2 * v) * 0.5 + 0.5;
}

function tri(v) {
  return abs((1 - fract(v) * 2))
}