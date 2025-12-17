import platform, {Platform} from "platform";
import {Character} from "./character";
import {GameHandler} from "gameState";

function setup(){
    createCanvas(canvasX, canvasY); //inputable for diff screens :D
}

const canvasX = 400;
const canvasY = 1000;
let character = new Character(100, 50, 25, 25, "lightyellow");
let collissionCheck = new Character(1, 1, 15, 15, "lightgreen"); // check for future deathstate 
const deathFloor = canvasY + character.h/2;
const platformMax = 10;
const gravity = 0.6;
let velocity = 0;

const jumpValue = 200; //inputable for testing || replace later maybe with let cameraShift = character.y until a certain point;
const characterHorizontalMoveSpeed = 8; //maybe i just like values in one place

let platforms = [ //later start with a platform at top that will spawn at randomY beneath, push each new platform to the end of the array, refer to last item in array by [platforms.length - 1] index
    // hav new platforms spawn in the biggest space
    new Platform(75, canvasY, 100, 25),
    ];

function draw(){ //playstate main draw function
    background(170, 220, 170); //color cause im getting dizzy

    collissionCheck.draw();
    character.draw();
    
    if (platforms.length < platformMax){
    spawnPlatform(platforms, canvasX);
    }

    for (const platform of platforms) { //the main platform function
        platform.draw();
    }

    if(platforms[0].y > canvasY){
        platforms.shift();
    }

    characterMove(character); //horizontal shmoovement

    velocity+=gravity;
    character.y+=velocity;

    if(!characterFall(character, platforms) && velocity >0){
        velocity= -18;
    }
   //if we are falling we falling with formula
   //if we collide, we jump until the velocity turns 0 and then fall again
  
        }//main draw function end

function spawnPlatform(platforms, canvasX){ 
    while(platforms.length < platformMax){
            let newestPlatform = platforms[platforms.length-1];
            let randomizedXspawn = Math.floor(random(0, canvasX-newestPlatform.w));
            let randomizedYspawn = newestPlatform.y - Math.floor(random(50, 150));
            platforms.push (new Platform(randomizedXspawn, randomizedYspawn, 100, 25));
    }
}

function characterMove(character){ //horizontal movement
    if (character.x > canvasX){
        character.x = 0 - character.w;
    }
    if (character.x + character.w < 0){
        character.x = canvasX;
    }
    switch (true) {
        case keyIsDown(LEFT_ARROW):
        character.x -= characterHorizontalMoveSpeed;
        break;
        case keyIsDown(RIGHT_ARROW):
        character.x += characterHorizontalMoveSpeed;
        break;
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
    collissionCheck.color = "red"; //gameState = "death";
    return false; // if we are in neither of situations then we are not falling
}

// function checkGameState (gameHandler){
//         switch (gameHandler.gamestate){
//             case "start" || "end":
//                 return false;
//             case "play":
//             return //call function

//         }
    //}

//chack wht gamestate we are

//have that if gameState