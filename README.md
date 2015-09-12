# WormyJs
HTML5 pure JS + canvas game engine

latest release - https://jsfiddle.net/1c57vhs1/13/

## Alpha notes:
GameObject properties: x, y, width, height, shape

GameObject methods: centerX, centerY, r, distanceTo, boundingBox, isColliding, draw

*both draw() and isColliding() will adjust itself accordingly to it's shape

How to use the Engine:

you should override: initialize(), update() and draw()

initialize your GameObjects in "initialize()"

"update()" runs 60 times/s, use deltaTime modifier for framerate independency. use it for your game logic.

"draw()" is called right after update. use it for drawing your GameObjects




![alt text](http://i.imgur.com/59i0K7E.png?1 "preview")
