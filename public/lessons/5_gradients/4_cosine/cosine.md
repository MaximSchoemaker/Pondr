Back to `RGB` !

Using the `cosn` signal function (same as [`sinn`](/#/3_animation/3) but for `cos`) we can create a [cosine gradient](https://iquilezles.org/www/articles/palettes/palettes.htm)
---
The gradient is defined by the constants:
```
0, 0.33, 0.66
```
Evenly spaced cosine waves produce a lovely rainbow ✨
---
Challenge!
- Change around the cosine constants and see what other gradients there are!
- set one of the constants to `t`
- multiply the `cosn`'s `iFract`s by some constant
for example: `cosn(iFract * 0.5 + t)`