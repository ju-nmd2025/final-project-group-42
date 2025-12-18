export default class GameHandler{
    constructor() {
        this.gameState = "start";
        this.deathTextSize = 30;
    }

    startScreen(canvasX, canvasY){
        background(170, 220, 170);
        fill("Green");
        textAlign(CENTER);
        textSize(40);
        text("Lessss goooooo", canvasX/2, canvasY/3);

        fill("darkgreen");
        rectMode(CENTER);
        rect(canvasX/2, canvasY/2, 150, 50, 10);
        fill(170, 220, 170);
        textSize(24);
        text("start", canvasX/2, canvasY/2+10);
    }

    deathScreen(canvasX, canvasY){
        background(50, 0, 0);
        fill(255, 0, 0);
        textAlign(CENTER);
         if (this.deathTextSize <50){
            this.deathTextSize+=0.5;
         }
        textSize(this.deathTextSize);
        text("YOU DIED \n -dark souls sound effect-", canvasX/2, canvasY/3);
        
    }
}