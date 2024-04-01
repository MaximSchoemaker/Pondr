`f` goes from 0 to 1 in a straight line. What would happen if we turn that into a wave? 🌊
---
The `wave` function turns a number into a wave like so:
`wave(f)`
---
The wave has a min and max value indicating the low and high point of the wave. By default they're set to 0 and 1:
- `wave_min = 0`
- `wave_max = 1`
---
Challenge!
- change `petal_size = f` into `petal_size = wave(f)`
- now change it to `wave(f * 3)`
- set `wave_min = mouse_x` and `wave_max = mouse_y`