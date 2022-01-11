//Declaring global variables
var trex ,trex_running;
var ground,groundImage;
var groundColliding;

//Predifined function used to load things
function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  groundImage = loadImage("ground2.png");
}

//To create things, only happens once
function setup(){
  createCanvas(600,200);
  
  //Create ground sprite
  ground = createSprite(300,180,600,10);
  ground.addImage("the ground",groundImage);
  ground.velocityX = -10;

  //create a trex sprite
  trex = createSprite(50,160);
  trex.addAnimation("running",trex_running);
  trex.scale = 0.5;

  //Creating invisible ground
  groundColliding = createSprite(300,189,600,10);
  groundColliding.visible = false
}

//Does things for every frame
function draw(){
  //Changes the backround and stops duplicating sprites when they move
  background("white");
  if(keyDown("space") && trex.collide(ground)){
    trex.velocityY = -6;
  }
  //Adding gravity
  trex.velocityY += 0.2;

  //Stopping the trex from falling out of the game
  trex.collide(groundColliding)

  //Making the ground infinite
  if(ground.x < 0){
    ground.x = 1100;
  }
  drawSprites();

}
