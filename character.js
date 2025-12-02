export default class Character {
    
    constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

    
    draw() {
            rect(this.x, this.y, this.w, this.h);
        }

    isColliding(platform) {
        if ( ((this.y + this.h) >= platform.y) &&
             ((this.x + this.w) >= platform.x) &&
             (this.x <= (platform.x + platform.w)) )
        {
            return true;
        }

        return false;
    }
}