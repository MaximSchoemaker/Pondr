`i` starts at `0` and the loop runs while `i < 10`. Lower than 10 does not include 10. So while the loop runs `10` times, variable `i` goes from `0` to `9`.
---
This means that iFract runs from `0 / 10` to `9 / 10` and never actually reaches `1`

You can probably spot where the middle line is missing.
---
To have `iFract` go all the way up to `1` we can change it slightly to:
```
let iFract = i / (count - 1)
```
---
Challenge! 
- Update `iFract` to go from `0` to `1`