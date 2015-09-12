# WormyJs
HTML5 pure JS + canvas game engine

Latest release - https://jsfiddle.net/1c57vhs1/13/

## Alpha notes:
GameObject properties: x, y, width, height, shape  
GameObject methods: centerX, centerY, r, distanceTo, boundingBox, isColliding, draw 

*both draw() and isColliding() will adjust itself accordingly to it's shape

*spherical GameObjects will be drawn based on centerX and centerY of it's boundingBox

### How to use the Engine:
You should override: initialize(), update() and draw()  
-Initialize your GameObjects in "initialize()"  
-"update()" runs 60 times/s, use deltaTime modifier for framerate independency. Use this for your game logic.  
-"draw()" is called right after update. Use this for drawing your GameObjects  

*both background and default drawing colors can be set at "clearCanvas()" method on the Engine object.

![alt text](http://i.imgur.com/59i0K7E.png?1 "preview")
