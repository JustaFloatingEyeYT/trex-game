//Declaring global variables
var trex,trex_running;
var ground,groundImage;
var groundColliding;
var cloud,cloudImage;
var obstacle,obstacleImage1;
var obstacleImage2;
var obstacleImage3;
var obstacleImage4;
var obstacleImage5;
var obstacleImage6;
var score = 0;
var play = 1;
var end = 0;
var gamestate = play;
var cloudGroup,obstacleGroup;
var gameOver,gameOverImage;
var restart,restartImage;
var jumpSound;
var deathSound;
var checkpointSound;

//Predifined function used to load things
function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacleImage1 = loadImage("obstacle1.png");
  obstacleImage2 = loadImage("obstacle2.png");
  obstacleImage3 = loadImage("obstacle3.png");
  obstacleImage4 = loadImage("obstacle4.png");
  obstacleImage5 = loadImage("obstacle5.png");
  obstacleImage6 = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  trex_end = loadAnimation("trex_collided.png");
  jumpSound = loadSound("jump.mp3");
  deathSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkpoint.mp3");
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
  // trex.setCollider("circle",0,0,35);
  trex.setCollider("rectangle",0,0,120,trex.height)
  trex.addAnimation("running",trex_running);
  trex.addAnimation("end",trex_end);
  trex.scale = 0.5;

  //Creating invisible ground
  groundColliding = createSprite(300,189,600,10);
  groundColliding.visible = false

  //objectname = new Class();
  obstacleGroup = new Group();
  cloudGroup = new Group();

  //Create Game Over sprites
  gameOver = createSprite(300,100,2,2);
  gameOver.addImage(gameOverImage);
  restart = createSprite(300,150,2,2);
  restart.addImage(restartImage);
  gameOver.scale = 0.5
  restart.scale = 0.3

}

//Does things for every frame
function draw(){
  //Changes the backround and stops duplicating sprites when they move
  background("white");

  if(gamestate === play){
    score = Math.round(frameCount / 4);
    if(score % 100 == 0 && score >= 100){
      checkpointSound.play();
    }

    if(keyDown("space") && trex.collide(ground)){
      trex.velocityY = -16;
      jumpSound.play();
    }

    //Adding gravity
    trex.velocityY += 1.60;

    //Stopping the trex from falling out of the game
    trex.collide(groundColliding)

    //Making the ground infinite
    if(ground.x < 0){
      ground.x = 1100;
    }

    restart.visible = false;
    gameOver.visible = false;

    obstacleSpawn();
    spawnClouds();

    if(trex.isTouching(obstacleGroup)){
      // gamestate = end;
      // deathSound.play();
      jumpSound.play();
      trex.velocityY =- 12;
    }

  }
  else if(gamestate === end){
    trex.velocityX = 0;
    trex.velocityY = 0;
    ground.velocityX = 0;
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);

    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);

    trex.changeAnimation("end",trex_end);

    restart.visible = true;
    gameOver.visible = true;
  }

  text("Score: " + score, 10, 15);

  drawSprites();

}

function spawnClouds(){
  if(frameCount%60 == 0){
    cloud = createSprite(645,80,2,2)
    cloud.addImage("clouds",cloudImage)
    cloud.velocityX = -5
    cloud.y = Math.round(random(0,100))
    trex.depth = cloud.depth;
    //Time = distance / speed
    cloud.lifetime = 140;
    cloudGroup.add(cloud);
  }
}

function obstacleSpawn(){
  if(frameCount%60 == 0){
    obstacle = createSprite(645,160,10,10);
    obstacle.velocityX = -10;
    var r = Math.round(random(1,6));
    obstacle.lifetime = 140;
    switch(r){
      case 1: obstacle.addImage(obstacleImage1); 
      break;
      case 2: obstacle.addImage(obstacleImage2); 
      break;
      case 3: obstacle.addImage(obstacleImage3); 
      break;
      case 4: obstacle.addImage(obstacleImage4); 
      break;
      case 5: obstacle.addImage(obstacleImage5); 
      break;
      case 6: obstacle.addImage(obstacleImage6); 
      break;
      default: break;
    }
    obstacle.scale = 0.5;
    obstacleGroup.add(obstacle);
  }
}
