One thing you might have noticed in the 4k screenshot is that `strokeWeight` doesn't scale when you increase the `size` of the canvas.
---
To make the `strokeWeight` scale we multiply it by `size`. 
---
To use the original `50` `strokeWeight` value we multiply it by `size` divided by the original `200` size of the canvas.
---
And Voilà! We have the original render set up to scale dynamically :)
---
Challenge! Take another 4k screenshot and see if the sketch scales accurately...