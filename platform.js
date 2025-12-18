export default class Platform {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.margin = 10
    }

    draw() {
        push();
        fill("Green");
        rectMode(CORNER);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
}