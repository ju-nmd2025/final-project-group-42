import {Platform} from "platform";
import {Character} from "./character";
import {GameHandler} from "gameState";

function setup(){
    createCanvas(canvasX, canvasY); //inputable for diff screens
}

const canvasX = 300;
const canvasY = 600;
let character = new Character(100, 50, 25, 25, "lightyellow");
let collissionCheck = new Character(1, 1, 15, 15, "lightgreen");
const deathFloor = canvasY + character.h/2;
//const gameSpeed = 20;
//let cameraShift = character.y until a certain point;
//console.log(cameraShift);
const characterHorizontalMoveSpeed = 7;

let platforms = [
    new Platform(75, 200, 100, 25),
    new Platform(150, 100, 100, 25)];

// function spawnRandomPlatforms(canvasX, platforms){
//     let maximumXSpawn
//     let minimumXSpawn
//     let biggestSpaceX = Math.floor(Math.random()*(maximumXSpawn - minimumXSpawn) + maximumXSpawn)
//     platforms.push(new Platform(biggestSpaceX, 600, 100, 25))
// };

// function checkGameState (gameHandler){
//         switch (gameHandler.gamestate){
//             case "start" || "end":
//                 return false;
//             case "play":
//             return //call funcit

//         }
    //}

// hav new platforms spawn in the biggest space
//chack wht gamestate we are

//have that if gameState
function draw(){
    background(170, 220, 170); //color cause im getting dizzy

    collissionCheck.draw();
    character.draw();

    for (const platform of platforms) { //the main platform function
        platform.draw();
        //platform.y += 4; // platform movement

        if(platform.y > canvasY){ //later replace with random spawn and then despawn
            platform.y = 0 - platform.h;
            }
    }

    characterMove(character); //horizontal shmoovement

    // if ((character.y > (canvasY/2))&&(!character.isColliding())){
    //     for(let platform of platforms){
    //         platform.y+= character.y;
    //     }
    // }else{

    // }

    if (characterFall(character, platforms)){ //if true - we fall
        character.y += 10; //character falling, replace with formula later
    }
    if (!characterFall(character, platforms)){
        character.y -= 50;
        if (character.y < (canvasY/2)){
        for(let platform of platforms){
            platform.y += 50;
        }
        }
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


