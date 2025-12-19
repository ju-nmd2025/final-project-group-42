export default class Platform {

    constructor(x, y, w, h, i) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.index = i; //sprry but im too lazy to change it across the game into smth other :(((

        switch (this.index){
            case 1 :
            this.color = "Green";
            break;
            case 2 :
            this.color = "White";
            this.mobility = 2;
            this.direction = random() > 0.5? 1 : -1;
            break;
            case 3 :
            this.color = "red";
            this.breakState = "Unbroken";
            break;
            case 4 :
            this.color = "blue";
            break;
        } 
    }

    draw() {
        push();
        fill(this.color);
        rectMode(CORNER);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
}
export { Platform };