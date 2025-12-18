export default class Character {
    
    constructor(x, y, w, h, color) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
        this.color = color;
	}

    draw() {
        push();
        fill(this.color);
        rectMode(CORNER);
        rect(this.x, this.y, this.w, this.h);
        pop();
        }


        characterMove(thisHorizontalMoveSpeed){ //horizontal movement
    if (this.x > canvasX){
        this.x = 0 - this.w;
    }
    if (this.x + this.w < 0){
        this.x = canvasX;
    }
    switch (true) {
        case keyIsDown(LEFT_ARROW):
        this.x -= thisHorizontalMoveSpeed;
        break;
        case keyIsDown(RIGHT_ARROW):
        this.x += thisHorizontalMoveSpeed;
        break;
    }
}

    isColliding(platform) {
        if ( ((this.y + this.h) >= platform.y) &&
             ((this.x + this.w) >= platform.x) &&
             (this.x <= (platform.x + platform.w)) 
             &&(this.y <=(platform.y + platform.h))
        )
        {
            return true;
        }
        return false;
    }
}

