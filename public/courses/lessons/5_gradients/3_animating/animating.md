Using the `t` variable from the [animation lesson](#/3_animation/7) we can animate the `hue`
---
Notice how the rainbow is seamless even though `fract` will make the `hue` jump back from `1` to `0`

This is because `hue` is circular, like on a colour wheel:

<a href="https://en.wiktionary.org/wiki/color_wheel#/media/File:Colorwheel.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Colorwheel.svg" alt="colour wheel" /></a>
---
While rainbows are cool, you might be interested in a more limited palette.

Challenge!
- Set `hue` to `fract(iFract * 0.2 + t)`
- Change around the `0.2` and see what happens :)