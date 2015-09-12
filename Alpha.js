function GameObject(x, y, width, height, shape) {

    //seta valores padrão para argumentos não enviados
    var x      = (x === undefined)      ? 10 : x
    var y      = (y === undefined)      ? 10 : y
    var width  = (width === undefined)  ? 100 : width
    var height = (height === undefined) ? 100 : height
    var shape = (shape === undefined) ? "sphere" : shape

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.shape = shape;

    this.centerX = function() {
        return this.x + this.width/2;
    }

    this.centerY = function() {
        return this.y + this.height/2;
    }

    this.r = function() { // retorna o raio desse objeto
        if (this.height <= this.width) {
            return height/2;
        }
        else {
            return width/2;
        }
    }

    this.distanceTo = function(gameObject) { // retorna a distância em pixels do centro até o centro de outro gameObject
        var distanceX = this.centerX() - gameObject.centerX();
        var distanceY = this.centerY() - gameObject.centerY();
        var distance = Math.sqrt( Math.pow(distanceX,2) + Math.pow(distanceY,2) );
        return distance;
    }

    this.boundingBox = function() { // retorna a caixa que contorna esse objeto
        var boundingBox = {
            "A" : {"x" : this.x,                "y" : this.y},
            "B" : {"x" : this.x + this.width,   "y" : this.y},
            "C" : {"x" : this.x,                "y" : this.y + this.height},
            "D" : {"x" : this.x + this.width,   "y" : this.y + this.height},
        }
        return boundingBox;
    }

    this.isColliding = function (gameObject) {

        if (this.shape == "rectangle" || gameObject.shape == "rectangle") {

            min1 = this.boundingBox()["A"];
            max1 = this.boundingBox()["D"];
            min2 = gameObject.boundingBox()["A"];
            max2 = gameObject.boundingBox()["D"];

            x_overlap = Math.max(0, Math.min(max1["x"],max2["x"]) - Math.max(min1["x"],min2["x"]));
            y_overlap = Math.max(0, Math.min(max1["y"],max2["y"]) - Math.max(min1["y"],min2["y"]));

            if ((x_overlap * y_overlap) == 0) {
                return false;
            }
            else {
                return true;
            }

        }
        else if (this.shape == "sphere") {
            var distanceToCollide = this.r() + gameObject.r()
            var isColliding = (this.distanceTo(gameObject) <= distanceToCollide)
            if (isColliding) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    this.draw = function (context, color) {
        var color = (color === undefined) ? "rgb(0, 0, 0)" : color


        if (this.shape == "rectangle") {
            context.fillStyle = color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
        else if (this.shape == "sphere") {
            context.arc(this.centerX(), this.centerY(), this.r(), 0, 2 * Math.PI);
            context.fillStyle = color;
            context.fill();
        }

    }

}

function Engine(canvasId) {

    self = this;

    self.keysDown = {};

    addEventListener("keydown", function (e) {
        self.keysDown[e.keyCode] = true;
    }, true);

    addEventListener("keyup", function (e) {
        delete self.keysDown[e.keyCode];
    }, true);

    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");

    this.fireUp = function() {
        this.then = Date.now();
        this.initialize();
        this.core();
    }

    this.core = function() {

        var self = this;

        var now = Date.now();
        var deltaTime = now - this.then;

        this.update(deltaTime / 1000);
        this.cleanCanvas("rgb(0, 255, 255)", "rgb(0, 0, 0)"); //background color, default color
        this.draw();

        this.then = now;

        requestAnimationFrame(function() {self.core()});
    }

    this.cleanCanvas = function(rgbBg, rgbDefault) {
        this.context.fillStyle = rgbBg;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = rgbDefault;
    }

    this.initialize = function() {
    }

    this.update = function(deltaTime) {
        // deltatime = 1/time(s)
        // ex: 60 * deltaTime = 60/s
    }

    this.draw = function() {
    }

    this.drawText = function(text, x, y, font) {
        var x = (x === undefined) ? 50 : x
        var y = (y === undefined) ? 50 : y
        var font = (font === undefined) ? "24px Arial" : font

        this.context.font = font;
        this.context.fillText("Keys Down: " + JSON.stringify(text),10,100);
    }

}

var engine = new Engine("game_window");

engine.initialize = function() {

    this.player = new GameObject(10,10,50,50,"rectangle");
    this.obstacle = new GameObject(300,10,50,50); //shape defaults to "sphere"

}

engine.update = function(deltaTime) {

    if (!this.player.isColliding(this.obstacle))
    {
        this.player.x += 70 * deltaTime;
    }

}

engine.draw = function() {

    this.player.draw(this.context, "rgb(255, 0, 0)");
    this.obstacle.draw(this.context); //color defaults to black, "rgb(0, 0, 0)"
    this.drawText(this.keysDown); //x and y defaults to 50, font defaults to "24px Arial"

}

engine.fireUp();
