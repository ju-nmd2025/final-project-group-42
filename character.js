export default class Character {
    
    constructor(x, y, w, h, color) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
        this.color = color;
	}

    /*isJumping(fallspeed, gravity){
    this.y = this.y+speed;
    speed = gravity + speed;
    return this.y;}*/

    // function jump(gravity, velocity, character){
//     switch character.isColliding{
//     case true: velocity += gravity;
//     character.y += velocity;
//     break;
//     case false: 
// }
// }

    draw() {
        push();
        fill(this.color);
            rect(this.x, this.y, this.w, this.h);
        pop();
        }

    isColliding(platform) {
        if ( ((this.y + this.h) >= platform.y) &&
             ((this.x + this.w) >= platform.x) &&
             (this.x <= (platform.x + platform.w)) &&
            (this.y <=(platform.y + platform.h)))
        {
            return true;
        }
        return false;
    }
}

