import {Platform} from "./platform.js";
import {Character} from "./character.js";
import {GameHandler} from "./gameState.js";
type="module";

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
    new Platform(75, canvasY, 100, 25, 1),
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
    platform_move(platforms, canvasX);

    character.y+=velocity;
    velocity+=gravity; //velocity is shared across all stuff that needs it and is constantly dropped by gravity

    if(velocity > 30){
        velocity = 30; //velocity cap similar to maximum fall speed irl, just to avoid potential mach speeds
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

}//main draw function end

function spawnPlatform(platforms, canvasX){ 
    while(platforms.length < platformMax){
            let newestPlatform = platforms[platforms.length-1];
            let index;
            let indexProbability = get_random_index();
            if (indexProbability<=5){
                index = 2;
            }else { index =1;
            }
            platforms.push (new Platform(Math.floor(random(0, canvasX-newestPlatform.w)), newestPlatform.y - Math.floor(random(60, 200)), 100, 25, index));
    }
}

  function get_random_index(){
        return Math.floor(random(1, 20));
    }

function platform_move(platforms, canvasX){
    for (const platform of platforms){
        if (platform.index === 2){
            platform.x += (platform.mobility * platform.direction);
            if (platform.x+platform.w >= canvasX){
                platform.direction = -1;
                platform.x = canvasX - platform.w;
        } else if (platform.x <= 0){
            platform.direction =1;
            platform.x = 0;
        }
        }
    }
}

function mousePressed(){
    if(gameHandler.gameState === "start" || gameHandler.gameState === "death"){
        if (mouseX > width/2 - 75 && mouseX < width/2 + 75 &&
            mouseY > height/2 - 25 && mouseY < height/2 + 25) {
            gameHandler.gameState = "play";
            character.y = 10;
            character.x = canvasX/2;
            velocity = 0;
    }
}
}

function characterFall(character, platforms){ 
     for (const platform of platforms) {
        if (character.isColliding(platform)) { //checks if character is colliding, if true, then not falling
            return false;
        }
    }
    if (character.y < deathFloor){ // if we are above death floor then we fall
        return true; 
    }
    gameHandler.gameState = "death";
    return true; // if we are in neither of situations then we are dead
}

window.setup = setup;
window.draw = draw;

window.addEventListener("click", function (event) {
    mousePressed();
});

window.addEventListener("keydown", function (event) {
    keyIsDown();
});