export default class Platform {

    constructor(x, y, w, h, i) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.index = i;

        if (this.index === 1){
            this.color = "Green";
        }else if (this.index === 2){
            this.color = "White";
            this.mobility = 2;
            this.direction = random() > 0.5? 1 : -1;
        }
    }

    draw() {
        // if(this.index === 1){
        //     this.x += this.mobility;
        //     if (this.x + this.w > canvasX)
        // }
        push();
        fill(this.color);
        rectMode(CORNER);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
}
export { Platform };