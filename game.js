import platform, {Platform} from "platform";
import {Character} from "./character";
import {GameHandler} from "gameState";

function setup(){
    createCanvas(canvasX, canvasY); //inputable for diff screens :D
}

const canvasX = 300;
const canvasY = 600;
let character = new Character(100, 50, 25, 25, "lightyellow");
let collissionCheck = new Character(1, 1, 15, 15, "lightgreen"); // check for future deathstate 
const deathFloor = canvasY + character.h/2;
const gravity = 0.4;
let vy = 0;

const jumpValue = 200; //inputable for testing || replace later maybe with let cameraShift = character.y until a certain point;
const characterHorizontalMoveSpeed = 8; //maybe i just like values in one place

let platforms = [ //later start with a platform at top that will spawn at randomY beneath, push each new platform to the end of the array, refer to last item in array by [platforms.length - 1] index
    // hav new platforms spawn in the biggest space
    new Platform(75, 500, 100, 25),
    ];

let newestPlatform = platforms[platforms.length-1];
console.log(platforms[platforms.length-1]);

function draw(){ //playstate main draw function
    background(170, 220, 170); //color cause im getting dizzy

    collissionCheck.draw();
    character.draw();

    for (const platform of platforms) { //the main platform function
        platform.draw();

        if(platform.y > canvasY){ //later replace with random spawn and then despawn
            platform.y = 0 - platform.h;
            }
    }

    characterMove(character); //horizontal shmoovement
    
   spawnPlatform(platforms, canvasX, newestPlatform);

    // if ((character.y > (canvasY/2))&&(!character.isColliding())){
    //     for(let platform of platforms){
    //         platform.y+= character.y;
    //     }
    // }else{

    // }

    if (characterFall(character, platforms)){ //if true - we fall
        character.y += 10; //replace with formula later
    }
    if (!characterFall(character, platforms)){ //we touching platform? we jump
        character.y -= jumpValue;
        if (character.y < (canvasX - (canvasY/3))){ // and if we are above this treshold, the platforms !jump
            for(const platform of platforms){
            platform.y += jumpValue; //it doesnt seemto work with respawn of old stuff
            }
        }
    }

} //main draw function end

// move all functions to utilite 

// function jump(gravity, velocity, character){
//     switch character.isColliding{
//     case true: velocity += gravity;
//     character.y += velocity;
//     break;
//     case false: 
// }
// }

// function killingPlatforms(platforms){
//     if ((platforms[0].y + platform.h) > canvasY){
//     platforms }
// }

// function biggestSpaceX(platforms, canvasX, newestPlatform){ //returns array of min and max value for random spawn of next platform
//     for(const platform of platforms){
//         let leftSpaceAvailable = [(canvasX - newestPlatform.x), 
//             [0, newestPlatform.x]];
//         let rightSpaceAvailable = [(canvasX - newestPlatform.x + newestPlatform.w), 
//             [(newestPlatform.x + newestPlatform.w), canvasX]];

//         if (leftSpaceAvailable[0] > rightSpaceAvailable[0]){
//             console.log('left space');
//             return leftSpaceAvailable;
//         }
//         if (leftSpaceAvailable[0] <= rightSpaceAvailable[0]){
//             console.log('right space');
//             return rightSpaceAvailable;
//         }
//     }
// }

function spawnPlatform(platforms, canvasX, newestPlatform){
    //const result = biggestSpaceX (platforms, canvasX, newestPlatform);
    // let maximumXSpawn = result[1[1]];
    // let minimumXSpawn = result[1[0]];
    let randomizedXspawn = Math.floor(Math.random()*(canvasX - 0) + 0);//Math.floor(Math.random()*(maximumXSpawn - minimumXSpawn) + maximumXSpawn);
    let randomizedYspawn = newestPlatform.y - Math.floor(Math.random()*(200-75) +75);
    console.log(randomizedYspawn);
    while(platforms.length <12) //the oldest and lowest platform has space up until -(5*platform.h) on y coordinate
        console.log('spawn platform');
        platforms.push (new Platform(randomizedXspawn, randomizedYspawn, 100, 25));
    //it would spawn items above it on randomized y value within x coordinate     newestPlatform.x
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




