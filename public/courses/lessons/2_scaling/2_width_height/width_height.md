As you might have noticed our drawing is tucked away in the corner...

We can solve this by using 2 more variables:
```
width
height
```
---
`width` and `height` are equal to the width and height of the canvas after creating it with `createCanvas`
---
we can use these variables to draw our first line to fit the width and height of the sketch like so:
```
line(
  0.25 * width, 0.25 * height, 
  0.75 * width, 0.75 * height
)
```
---
Challenge! Draw both lines using the `width` and `height` variables. 

Solution on next slide...