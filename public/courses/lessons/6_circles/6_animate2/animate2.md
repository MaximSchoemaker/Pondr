To animate the polygon version we want to be a bit cleverer. We can abstract the coordinates code into a seperate function 
```
coordinates(angle)
```
we pass the `angle` and get an object with the `x` and `y` coordinate back.
---
Now to change the animation we only have to make changes in the `coordinates` function and they get applied to both `p1` and `p2`
---
Challenge! Make something rediculous ✨✨✨