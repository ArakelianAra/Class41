var bgImg, car1Img, car2Img, track;
var form,game,player
var gs,db,pc
var car1, car2;
var allPlayers
var fuelImg,coinImg
var cars, fuelGroup, coinGroup;
var obstacle1Img,obstacle2Img
var obstaclesGroup
var heartImg
function preload(){
    bgImg=loadImage("Images/background.png")
    car1Img=loadImage("Images/car1.png")
    car2Img=loadImage("Images/car2.png")
    track = loadImage("Images/track.jpg");
    fuelImg=loadImage("Images/fuel.png")
    coinImg=loadImage("Images/goldCoin.png")
    obstacle1Img=loadImage("Images/obstacle1.png")
    obstacle2Img=loadImage("Images/obstacle2.png")
    heartImg=loadImage("Images/life.png")
}

function setup(){

    db = firebase.database();

    createCanvas(windowWidth,windowHeight);
    game=new Game()
    game.getState();
    game.start()
}

function draw(){
    background(bgImg)

    if(pc===2){
        game.update(1)
    }
    if(gs===1){
        game.play()
    }
}

//Adjusts the window size of the game whenever the window size of the browser is changed
function windowResized(){
    resizeCanvas(windowWidth,windowHeight)
}
/*

1. Form
    - player's name input box
    - button to start the game

2. Player
    - Storing player's info:
        - player's names
        - rank/position
        - score
    - player count
    - Reading & updating all this info to the db

3. Game
    - Game states:
        - Wait state - 0
        - Play state - 1
        - End state - 2
    - Reading & updating this to the db

*/
