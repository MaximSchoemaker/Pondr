We know how to draw circles. But how do you draw a circle of circles...
---
To draw things in a circle we can use `cos` and `sin`:
- `cos` will give us the `x` coordinate
- `sin` will give us the `y` coordinate

like so:
```
let x = cos(angle) * radius
let y = sin(angle) * radius
```
- `radius` tells you how big the circle is. 
- `angle` tells you how far along the circle you are.

Have a look at this [gif](https://commons.wikimedia.org/wiki/File:Circle_cos_sin.gif)
---
The `angle` in this case is in radians, meaning that for `cos` and `sin`
- the input goes from `0` to `2 * PI`
- the output goes from `-1` to `1`
---
To make things simpler we've added `scos` and `ssin` 
- the input goes from `0` and `1`
- the output still goes from `-1` to `1`
---
To make sure the circle is drawn in the middle of the sketch we've add `0.5` to both the `x` and the `y`
---
Challenge! 
- `angle` is based off `iFract`. Multiply this by a certain amount and try to create a half circle.