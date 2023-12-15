Draw functions
```
stem()
bud()
petal()
```

---

Controls:
- Drag the mouse to look around
- Scroll to zoom in and out
- R to reset
- F to toggle fullscreen

---

Stem usage:
```
stem_size = 1
stem_length = 1
stem_width = 1 / 10
stem_bend = 0
stem_turn = 0
stem_offset = 0
stem_color = "limegreen"
stem()
```
Bud usage:
```
bud_size = 1
bud_turn = 0
bud_offset = 0
bud_color = "yellow"
bud()
```
Petal usage:
```
petal_size = 1
petal_width = 1 / 2
petal_turn = 0
petal_offset = 1 / 2
petal_color = "white"
petal()
```

---

Use `mouse_x` and `mouse_y` to control the values with your mouse:
```
stem_bend = mouse_x - 1 / 2
stem_length = mouse_y
stem()
```

---

Control functions:
```
repeat()
branch()
fork()
ring()
```

---

Repeat usage:
```
repeat_count = 3
repeat(stem)
```
Branch usage:
```
branch(bud)
petal()
```
Fork usage:
```
fork_count = 2
fork_angle = 1 / 4
fork(petal)
```
Ring usage:
```
ring_radius = 0
ring_count = 5
ring(petal)
```

---

You can also pass multiple draw functions to a control function:
```
ring_radius = 1 / 2
ring_count = 10
ring(petal, stem)
```

---

Make custom draw functions to call on their own:
```
function my_garden() {
  my_flower()
  my_flower()
}

function my_flower() {
  stem()
  bud()
  petal()
}
```
or to pass to a control function:
```
function my_garden() {
  ring_radius=1
  ring(my_blossom)
}

function my_blossom() {
  bud()
  petal()
}
```

---

Use `f` inside a control function call:
```
function my_garden() {
  ring_count = 30
  ring_radius = 1 / 2
  ring(my_petal)
}

function my_petal() {
  petal_size = f
  petal()
}
```

---

Use `wave(f)` to make it wave:
```
petal_size = wave(f)
petal()
```
Multiply `f` to increase the wave:
```
petal_size = wave(f * 3)
petal()
```
Add `t` to animate the wave:
```
petal_size = wave(f * 3 + t)
petal()
```

---

Set `wave_min` and `wave_max` to change the amount of wave:
```
function my_garden() {
  wave_min = -1 / 2
  wave_max = 1 / 2
  stem_bend = wave(t)
  stem()
  petal()
}
```

---

Everything together:
```
function my_garden() {
  wave_min = -1 / 10
  wave_max = 1 / 10
  stem_bend = wave(t / 2)
  
  repeat_count = 4
  repeat(stem)
  
  branch(bud)
  
  bud_size = 1 / 10
  ring_count = 30
  ring_radius = 1 / 2
  ring(bud, my_petal)
}

function my_petal() {
  wave_min = 1 / 2
  wave_max = 1
  petal_size = wave(f * 5 + t)
  petal()
}
```