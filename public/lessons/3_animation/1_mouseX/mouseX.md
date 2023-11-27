To do animations we are going to use P5's [draw](https://p5js.org/reference/#/p5/draw) function. Code inside the draw function will run 60 times a second. 

For code that only runs once we can use the [setup](https://p5js.org/reference/#/p5/setup) function. 
---
For a simple animation we are going to use the `mouseX` variable. This variable holds the X position of the mouse. 

If we divide the `mouseX` by `width` we get a value between `0` and `1`, like so:
```
let mX = mouseX / width
```
- `mX` of `0` means the mouse is on the left side of the window.
- `mX` of `1` means the mouse is on the right side of the window.
---
Challenge! 
- Set `x1`'s value to `mX` 
- move your mouse around!
- Set `x2`'s value to `1 - mX`
- move your mouse around some more!