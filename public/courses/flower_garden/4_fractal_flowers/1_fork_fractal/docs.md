You might have wondered what would happen if you call a function inside itself?

You get a fractal! 🌟
---
Normally if you call a function inside itself it gets stuck in an infinite loop. However, if you use `fork` the infinite loop gets stopped at a certain call depth.

Set the depth max to control how deep the fractal goes:
- `depth_max = 4`
---
Challenge!
- Change `depth_max` to `depth_max = 10 * mouse_y` and control the depth with your mouse 😮
- Set `stem_length` to `stem_length = depth_f` 🥦✨
