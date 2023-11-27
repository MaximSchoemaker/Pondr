To execute a sequence of commands we can use a [for loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration).
---
```
let count = 10
for (let i=0; i < count; i++) {
  // loop stuff!
}
```
The for loop has 3 sections seperated by a `;`
- initialization:  `let i = 0` 
here we initialize variable `i` at `0`
- condition:  `i < count` 
here we put a logic statement that says until when the loop runs. In this case it runs till `i` is `10`
- iteration:  `i++` 
here we increment the iteration variable `i` by `1`
---
Inside the loop we can use `i` to change how we draw a line.
---
Challenge! 
- Set `x2` to `width - i * 50`