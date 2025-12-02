export default class Platform {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        push();
        fill("Green");
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
}