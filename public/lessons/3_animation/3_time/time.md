Using the mouse is fun, but for animations it's more useful to have a time variable. 
---
We will use the variable `frameCount` to get the amount of times `draw` has been called. 

If we divide `frameCount` by a total number of `frames` we get our `t` value for time.
- a `t` of `0` means we're at frame `0` (the start)
- a `t` of `1` means we're at frame `100` (the end)
---
Currently the animation does not loop. Variable `t` goes over `1` after `100` frames. 

To make variable `t` loop back to `0` after it reaches `1` we can use the [fract](https://p5js.org/reference/#/p5/fract) function, like so:
```
let t = fract(frameCount / frames)
```
---
Challenge! 
- Make variable `t` loop.
- Set `x2` to `1 - t`
