import {Platform} from "platform";
import {Character} from "./character";

function setup(){
    createCanvas(canvasX, canvasY); //inputable for diff screens
}

let canvasX = 300;
let canvasY = 600;
let character = new Character(100, 50, 25, 25);
let deathFloor = canvasY+ character.h/2;

let characterHorizontalMoveSpeed = 7;

let accelerationOfGravity = 2;
let fallSpeed = 0;

let platforms = [
    new Platform(75, 550, 100, 25),
    new Platform(150, 450, 100, 25)];

function draw(){
    background(170, 220, 170); //color cause im getting dizzy

    character.draw();

    for (const platform of platforms) { //the main platform function
        platform.draw();
        // platform.y += 2; // platform movement

        // if(platform.y > canvasY){ //later replace with random spawn and then despawn
        //     platform.y = 0 - platform.h;
        //     }
    }

    characterMove(character); //horizontal shmoovement

    if (characterFall(character, platforms)){ //if true - we fall
    
        character.y += 10; //character falling, replace with formula later
    }
    if (!characterFall(character, platforms)){
        character.y -= 170;
    }
}

function characterMove(character){ //horizontal movement
    if (character.x > canvasX){
        character.x = 0 - character.w;
    }
    if (character.x + character.w < 0){
        character.x = canvasX;
    }

    if (keyIsDown(LEFT_ARROW)){
        character.x -= characterHorizontalMoveSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)){
        character.x += characterHorizontalMoveSpeed;
    }
}

function characterFall(character, platforms){ //should be working but doesnt
     for (const platform of platforms) {
       var call = character.isColliding(platform);
    //console.log({call});
        if (call) { //checks if character is colliding, if true, then not falling
            return false;
        }
    }

    if (character.y + character.h < deathFloor){ // WORKS
        return true; 
    }
    return false; // if we are in neither of situations then we are not falling
}


