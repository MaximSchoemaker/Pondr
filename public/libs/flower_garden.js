const PHI = (1 + Math.sqrt(5)) / 2;
let SIZE;
let SEED;
function setup() {
   windowResized();
   colorMode(RGB, 1);

   sketch_x = getItem("sketch_x") ??
      width / 2;
   sketch_y = getItem("sketch_y") ??
      height / 2;
   sketch_zoom = getItem("sketch_zoom") ??
      0.125;

   SEED = random(100000)
}

function windowResized() {
   SIZE = min(windowWidth, windowHeight)
   resizeCanvas(windowWidth, windowHeight)
}

let mouse_x, mouse_y;
let frames = 500;
let sketch_x, sketch_y, sketch_zoom;

function preDraw() {
   randomSeed(SEED);
   background(0.5, 0.25, 1);

   translate(sketch_x, sketch_y);
   scale(sketch_zoom);
   strokeWeight(SIZE / 30);
   rotate(-0.5 * TAU);

   t = millis() / 1000 * 60 / frames
   mouse_x = mouseX / width;
   mouse_y = 1 - mouseY / height;

   storeItem("sketch_x", sketch_x);
   storeItem("sketch_y", sketch_y);
   storeItem("sketch_zoom", sketch_zoom);
}

function draw() {
   preDraw();
   branch(my_garden);
}

function mouseDragged() {
   movedX && (sketch_x += movedX);
   movedY && (sketch_y += movedY);
}


function keyPressed() {
   if (keyCode === 82) {
      sketch_x = width / 2
      sketch_y = height / 2
      sketch_zoom = 0.125;
   }
   if (keyCode === 70)
      fullscreen(!fullscreen());
}

function mouseWheel(evt) {
   if (evt.deltaY < 0)
      sketch_zoom *= 1.1;
   else
      sketch_zoom /= 1.1;
   evt.preventDefault()
}

const ctx_vars = new Set();
const ctx_reset_vars = new Set();
const ctx_stack = [];

function registerCtxVar(name, default_value, reset_on_branch) {
   const v = { name, default_value };
   ctx_vars.add(v);
   if (reset_on_branch)
      ctx_reset_vars.add(v);
   globalThis[name] = default_value;
}

function getCtx() {
   const ctx = {};
   ctx_vars.forEach(v => ctx[v.name] = globalThis[v.name]);
   return structuredClone(ctx);
}

function setCtx(ctx) {
   ctx_vars.forEach(v => globalThis[v.name] = ctx[v.name]);
}

function pushCtx() {
   ctx_stack.push(getCtx());
}

function popCtx() {
   setCtx(ctx_stack.pop());
}

function wave(val = f, min, max) {
   return map(
      -cos(val * TAU),
      -1, 1,
      min ?? wave_min, max ?? wave_max
   );
}

function move(val) {
   translate(0, val * size * SIZE);
}

function turn(val) {
   rotate(val * TAU);
}

function branch() {
   push();
   ctx_reset_vars.forEach(v => globalThis[v.name] = v.default_value);
   pushCtx();
   [...arguments].map(f => f());
   popCtx();
   pop();
}

function ring() {
   prev_i = i;
   prev_f = f;
   prev_count = count;

   count = ring_count;
   for (i = 0; i < count; i++) {
      f = i / count;
      branch(() => {
         rotate(TAU * (f - 0.5))
         translate(0, size * SIZE * ring_radius);
         arguments[i % arguments.length]();
      });
   }

   i = prev_i;
   f = prev_f;
   count = prev_count;
}

function fork() {
   prev_i = i;
   prev_f = f;
   prev_count = count;

   count = fork_count;
   for (i = 0; i < count; i++) {
      f = i / (count - 1);
      branch(() => {
         rotate(TAU * (f - 0.5) * fork_angle)
         translate(0, size * SIZE * fork_radius);
         arguments[i % arguments.length]();
      });
   }

   i = prev_i;
   f = prev_f;
   count = prev_count;
}

function repeat() {
   pushCtx();
   ctx_reset_vars.forEach(v => globalThis[v.name] = v.default_value);
   prev_i = i;
   prev_f = f;
   prev_count = count;

   count = repeat_count;
   for (i = 0; i < count; i++) {
      pushCtx();
      f = i / count;
      arguments[i % arguments.length]();
      popCtx();
   }

   popCtx();
}


registerCtxVar("t", 0);

registerCtxVar("i", 0);
registerCtxVar("f", 0);
registerCtxVar("count", 0);
registerCtxVar("prev_i", 0);
registerCtxVar("prev_f", 0);
registerCtxVar("prev_count", 0);
registerCtxVar("size", 1);

registerCtxVar("wave_min", 0, true);
registerCtxVar("wave_max", 1, true);

registerCtxVar("repeat_count", 3);

registerCtxVar("ring_count", 5);
registerCtxVar("ring_radius", 0);

registerCtxVar("fork_count", 2);
registerCtxVar("fork_angle", 0.25);
registerCtxVar("fork_radius", 0);

const defaultDrawVars = { offset: 0.5, move: 0.5, turn: 0, size: 1, length: 1 }

function registerDrawFunc(name, func, vars) {
   vars = { ...defaultDrawVars, ...vars };

   for (let key of Object.keys(vars))
      registerCtxVar(name + "_" + key, vars[key]);

   globalThis[name] = function () {
      const offset = globalThis[name + "_offset"];
      const move = globalThis[name + "_move"];
      const this_size = globalThis[name + "_size"];
      // const color = globalThis[name + "_color"];
      const length = globalThis[name + "_length"];
      const turn = globalThis[name + "_turn"];

      rotate(turn * TAU);
      translate(0, offset * length * this_size * size * SIZE);

      func(...arguments);

      translate(0, move * length * this_size * size * SIZE);
   }
}

registerDrawFunc("petal", () => {
   push();
   fill(petal_color);
   ellipse(
      0,
      0,
      petal_width * petal_size * size * SIZE,
      petal_length * petal_size * size * SIZE
   );
   pop();
},
   { width: 0.5, color: "white" }
)

registerDrawFunc("bud", () => {
   push();
   fill(bud_color);
   circle(0, 0, bud_size * size * SIZE);
   pop();
},
   { offset: 0, color: "yellow" }
)

registerDrawFunc("stem", () => {
   push();

   noFill();
   const s = stem_length * stem_size * size * SIZE
   const x = cos((stem_bend / 4 + 0.25) * TAU) * s;
   const y = sin((stem_bend / 4 + 0.25) * TAU) * s;
   const cx = cos((stem_bend / 4 * 0.5 + 0.25) * TAU) * s * 0.75;
   const cy = sin((stem_bend / 4 * 0.5 + 0.25) * TAU) * s * 0.75;

   strokeWeight(SIZE * (2 / 30 + size * stem_size * stem_width));
   bezier(
      0, 0,
      0, s * 0.5,
      cx, cy,
      x, y,
   );

   stroke(stem_color);
   strokeWeight(size * SIZE * stem_size * stem_width);
   bezier(
      0, 0,
      0, s * 0.5,
      cx, cy,
      x, y,
   );

   pop();

   translate(x, y)
   const a = atan2((cy - y), (cx - x));
   rotate(a + PI * 0.5);
},
   { offset: 0, move: 0, bend: 0, width: 0.1, color: "limegreen" }
)

