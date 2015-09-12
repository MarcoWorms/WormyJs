# WormyJs
HTML5 pure JS + canvas game engine

![alt text](http://i.imgur.com/mkpamem.png?1 "preview")

Latest release - https://jsfiddle.net/1c57vhs1/18/

Hi there! I'd like to talk about this engine's purpose.  
I'm an amateur gamedev who likes to fastly protoype a game mechanic just to see how it's like. I'm writing this to be a "game prototyping engine", my goal here is to make a fast approach to common basic gamedev needs like "draw a colored square(or circle) instead of an sprite" or "give me fast basic collision". I came from ruby to js and this idea was inspired by Gosu, Phaser and Construct2.  
Any feedback is welcome :)

## Alpha notes:
GameObject properties: x, y, width, height, shape  
GameObject methods: centerX, centerY, r, distanceTo, boundingBox, isColliding, draw 

*both draw() and isColliding() will adjust itself accordingly to it's shape

*spherical GameObjects will be drawn based on centerX and centerY of it's boundingBox

### How to use the Engine:
- You should override: initialize(), update() and draw()  
- Initialize your GameObjects in "initialize()"  
- "update()" runs 60 times/s, use deltaTime modifier for framerate independency. Use this for your game logic.  
- "draw()" is called right after update. Use this for drawing your GameObjects  
- Use "this.drawText()" to draw text
- this.keysDown contains user input


*both background and default drawing colors can be set at "clearCanvas()" method on the Engine object.
