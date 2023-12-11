To make the `i` variable a bit more useful we can turn it into a fraction (value between 0 - 1) by dividing it by the count like so:
```
let iFract = i / count
```
---
When using `iFract` instead of `i` in loops you can change the `count` value and your sketch will still fit.
---
Challenge!
- Set `x1` and `x2` to: `(0.1 + 0.8 * iFract) * width`
- Change around the `count` value and see what happens!