import platform, {Platform} from "platform";
import {Character} from "./character";
import {GameHandler} from "gameState";

function setup(){
    createCanvas(canvasX, canvasY); //inputable for diff screens :D
}

const canvasX = 600;
const canvasY = 1000;
let character = new Character(100, 50, 25, 25, "lightyellow"); // check for future deathstate 
const deathFloor = canvasY + character.h;
const platformMax = 12;
const gravity = 0.6;
let velocity = 0;
let gameHandler = new GameHandler();

const characterHorizontalMoveSpeed = 8; //maybe i just like values in one place

let platforms = [  //we start with one origin platform at the bottom that is the reference point for all newly generated platforms above
    new Platform(75, canvasY, 100, 25),
    ];

function draw(){
    switch(gameHandler.gameState){
        case"start":
            gameHandler.startScreen(canvasX,canvasY);
            break;
        case "play":
            play();
            break;
        case "death":
            gameHandler.deathScreen(canvasX, canvasY);
            break;
    }
}

function play(){ //playstate main draw function
    background(170, 220, 170);

    character.draw();
    
    if (platforms.length < platformMax){
    spawnPlatform(platforms, canvasX);
    }

    for (const platform of platforms) { //the platform draw function
        platform.draw();
    }

    if(platforms[0].y > canvasY + 50){ //if the lowest and oldest platform in the array is below this treshold, it gets nuked from the array 
        platforms.shift(); //and unrendered (at least from what i saw during failed camera shift test)
    }

    character.characterMove(characterHorizontalMoveSpeed); //horizontal shmoovement

    character.y+=velocity;
    velocity+=gravity; //velocity is shared across all stuff that needs it and is constantly dropped by gravity

    if(velocity > 20){
        velocity =20; //velocity cap similar to maximum fall speed irl, just to avoid potential mach speeds
    }

    if (character.y < canvasY/3){ //if character reaches this point
        character.y = canvasY/3;//their coordinate is reset to this point until their velocity makes them go donwwards
        for(const platform of platforms){
        platform.y -= velocity; // in the meantime the platforms are made to go down with the same velocity shared across character and platform
        } //therefore creating the illusion of shmoovement
    }

    if(!characterFall(character, platforms)){ //if character touches platform 
        velocity = -20; //the shared velocity is made negative to propel them upwards
    }

    if (character.y > deathFloor) {
        gameHandler.gameState = "death";
     } //gameState = "death";
}//main draw function end

function spawnPlatform(platforms, canvasX){ 
    while(platforms.length < platformMax){
            let newestPlatform = platforms[platforms.length-1];
            let randomizedXspawn = Math.floor(random(0, canvasX-newestPlatform.w));
            let randomizedYspawn = newestPlatform.y - Math.floor(random(50, 150));
            platforms.push (new Platform(randomizedXspawn, randomizedYspawn, 100, 25));
    }
}

function mousePressed(){
    if(gameHandler.gameState === "start"){
        if (mouseX > width/2 - 75 && mouseX < width/2 + 75 &&
            mouseY > height/2 - 25 && mouseY < height/2 + 25) {
            gameHandler.gameState = "play";
    }
}
}

function characterFall(character, platforms){ 
     for (const platform of platforms) {
        if (character.isColliding(platform)) { //checks if character is colliding, if true, then not falling
            return false;
        }
    }
    if (character.y + character.h < deathFloor){ // WORKS
        return true; 
    }
    return true; // if we are in neither of situations then we are not falling
}