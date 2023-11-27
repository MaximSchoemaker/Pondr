To animate the circle we are going to use the `sinn` signal [again](/#/3_animation/3). 
---
`sinn` is very similar to `ssin`
- both of them expect input between `0` and `1`
- `ssin` has a range from `-1` to `1`
- `sinn` has a range from `0` to `1`
---
```
let radius = sinn(iFract * 3) * 0.25 + 0.125
```
Using this code, the radius will wave up and down `3` times along the circle, ranging from `0.125` to `0.375`
---
Setting up the `t` variable as [before](/#/3_animation/2), we can change values based on time.
---
Challenge!
- change `sinn(iFract * 3)` to `sinn(iFract * 3 + t)`
- make a cool animation! ✨