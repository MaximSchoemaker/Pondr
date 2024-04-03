If you we're thinking of giving specific feedback, feel free to fill in "General Feedback" and ignore the rest of the form. Otherwise I'd love to invite you to join the discussion ✨

---

1 - Case preference

I've decided to use snake_case as opposed to cammelCase. My reasoning is that snake_case is more accessible in terms of legibility, which tracks with my own experience of dyslexia. 

The downside is that it requires knowledge of how to input an underscore. I think that tradeoff is reasonable given that parenthesis and curly braces are already required.

I'd be very interested to know your case preference and reasons for this preference.

---

2 - Fractions vs decimals vs percentages

I think that in creative coding it is very useful to work with normalized values (between 0 - 1). Multiplying fractions remain normalized whereas percentages tend to get out of control. While I do think percentages are more intuitive to beginners, building an intuition around ratios seems more valuable to me in the long term.

As for fractions vs decimals, I decided to use fractions throughout the lessons. Where `0.5` is easily parsable as a half, with `0.125` vs `1 / 8` I think fractions are more readable to beginners.

---

3 - Code complexity

Most of the code in Flower Garden is streamlined to be as small as possible. I made an exception for chapters Color and Interaction. My thinking is to encourage being able to interact with code that you do not fully understand by focussing on syntax highlighting and recognizable variable names. While this is an important skill to develop, potentially it's too early to put this in a beginners course. Let me know if you think it makes these chapters too difficult.

---

4 - t & f vs time & ???

I decided to use single letter variables for `t` and `f`. It keeps complicated calculations more consise (eg. `t + f * 1 / 2`) similar to how we do this in mathematical equations. I do think using `time` might be clearer, but `fraction` or `fract` makes less sense to me. I would love to know if you know a better word for `f`. It's essentially `index / count`, the fraction of the index over the count in a loop.

---

5 - Accessibility vs truthfulness

Flower Garden is optimized to be accessible in terms of syntax and concepts. One way I try to do this is by making style variables like `bud_size`, `stem_bend`, `petal_color`, etc work with a stack context when set inside a `repeat`, `ring`, `fork` or `branch` call. When setting the variable inside a control function the value gets set back to its previous value when leaving that call. This makes it so that style changes only effect `bud`, `stem` and `petal` calls inside that control function. This prevents style changes from affecting adjacent calls.

While this is easier to work with it is not how normal variable setting works inside plain JavaScript. I'm trying to weigh the value of accessibility against introducing a non-transferable intuition. In this case I think it is worth it, but I'd love to hear what you think.

---

6 - Inverted y-axis

Inverting the y-axis (origin = bottom left, vs top left) is another such concern. I opted to do this because it maps `mouse_y` in an intuitive way. I do however worry about introducing an intuition that will need to be unlearned in different programming contexts.

---

Thank you for your help! 🤗