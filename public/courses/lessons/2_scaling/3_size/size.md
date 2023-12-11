The cross scales, but it gets stretched out now...

There are multiple ways to solve this, but for now an easy solution is to make sure the canvas is always square.
---

We can do this by making our own variable called `size` and using it for both the canvas width and height.

We make `size` equal to the lowest value between the `windowWidth` and `windowHeight`

This way the sketch will always fit inside the window, but remain square.
---

We can do this using the [min](https://p5js.org/reference/#/p5/min) function like so:
```
let size = min(windowWidth, windowHeight)
```
---

Challenge! Set the canvas width and height equal to `size`

Solution on next slide...