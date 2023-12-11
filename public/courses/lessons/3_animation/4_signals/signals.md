Looping animations is not easy when using a `t` value that jumps from value `1` to `0`

To get an animation value that is smooth, we can use a signal function to transform `t`
---
A classic signal is the sine wave: <code>![sine wave](/images/sine.png)</code>

Sine waves can be calculated using the [sin](https://p5js.org/reference/#/p5/sin) function. The `sin` function has an range of `2 * PI` and an amplitude of `-1` to `1`
---
To make this signal easier to use, we've created a `sinn` function that normalizes the range and amplitute to be between `0` and `1`
---
Challenge! 
- Set `x1` to `sinn(t)`
- Set `x2` to `1 - sinn(t)`