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
var speedIncrease;

//Predifined function used to load things
function preload(){
  trex_running = loadAnimation("assets/image/trex1.png","assets/image/trex2.png","assets/image/trex3.png");
  groundImage = loadImage("assets/image/ground.png");
  cloudImage = loadImage("assets/image/cloud.png");
  obstacleImage1 = loadImage("assets/image/obstacle1.png");
  obstacleImage2 = loadImage("assets/image/obstacle2.png");
  obstacleImage3 = loadImage("assets/image/obstacle3.png");
  obstacleImage4 = loadImage("assets/image/obstacle4.png");
  obstacleImage5 = loadImage("assets/image/obstacle5.png");
  obstacleImage6 = loadImage("assets/image/obstacle6.png");
  gameOverImage = loadImage("assets/image/gameOver.png");
  restartImage = loadImage("assets/image/restart.png");
  trex_end = loadAnimation("assets/image/trex_collided.png");
  jumpSound = loadSound("assets/sound/jump.mp3");
  deathSound = loadSound("assets/sound/die.mp3");
  checkpointSound = loadSound("assets/sound/checkpoint.mp3");
}

//To create things, only happens once
function setup(){
  createCanvas(600,200);
  
  //Create ground sprite
  ground = createSprite(300,180,600,10);
  ground.addImage("the ground",groundImage);

  //create a trex sprite
  trex = createSprite(50,160);
  trex.setCollider("circle",0,0,35);
  // trex.setCollider("rectangle",0,0,120,trex.height)
  trex.addAnimation("running",trex_running);
  trex.addAnimation("end",trex_end);
  trex.scale = 0.5;

  //Creating invisible ground
  groundColliding = createSprite(300,190,600,10);
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
    score = score + Math.round(getFrameRate() / 50);
    if(score % 500 == 0 && score >= 500){
      checkpointSound.play();
    }

    // Fix this code for making the game get faster over time

    // speedIncrease = Math.round(score / 1000);
    // if(speedIncrease == 1 || speedIncrease > 1){
    //   obstacleGroup.setVelocityXEach(obstacleGroup.velocityXEach -= speedIncrease);
    //   cloudGroup.setVelocityXEach(cloudGroup.velocityXEach -= speedIncrease);
    //   ground.velocityX = (ground.velocityX -= speedIncrease);
    // }

    if((keyDown("space") || keyDown("UP_ARROW") || keyDown(87)) && trex.collide(ground)){
      trex.velocityY = -16;
      jumpSound.play();
    }
    if(keyDown("RIGHT_ARROW") || keyDown(68)){
      trex.x = trex.x += 5;
    }
    if(keyDown("LEFT_ARROW") || keyDown(65)){
      trex.x = trex.x -= 5;
    }

    if(trex.x > 550){
      trex.x = 550
    }
    if(trex.x < 50){
      trex.x = 50
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
      gamestate = end;
      deathSound.play();
    }

    ground.velocityX = -10;

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

    if(mousePressedOver(restart) || keyDown("space") || keyDown("UP_ARROW") || keyDown(87)){
      reset();
    }
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
    obstacle = createSprite(645,170,10,10);
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

function reset(){
  gamestate = play;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.y = 160;
  trex.x = 50;
  trex.changeAnimation("running", trex_running);
  score = 0;
}
