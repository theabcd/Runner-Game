var boy,boy_running,boy_collided;
var ground,invisibleGround,groundImage;
var PLAY=1
var End=0
var gameState=PLAY;
var obstaclesGroup,obstacleImg;
var coin,cImage,coinImage,coinGroup;
var cloudsGroup,cloudImage;
var gameOver,restart,gameOverImg,restartImg
var coinCollect
var score=0
var ground;
var coinScore=0;
var jump
var dead
function preload(){
boy_running=loadAnimation("Boy 1.png","Boy 2.png","Boy 3.png","Boy 4.png","Boy 5.png","Boy 6.png")
obstacleImg=loadAnimation("Blade1.png","Blade 2.png","Blade 3.png","Blade 4.png") 
coinCollect=loadSound("coin collection.wav")
cloudImage=loadImage("clouds.png")
boy_collided=loadImage("Boy 6.png")
gameOverImg=loadImage("gameover.png");
coinImage=loadImage("Coin.png")
  restartImg=loadImage("restart.png");
  jump=loadSound("jump.wav")
dead=loadSound("dead.wav")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
 
  boy=createSprite(50,height-170)
  boy.addAnimation("boy",boy_running)
  boy.addAnimation("collided",boy_collided)
  boy.setCollider("rectangle",0,0,80,175)
  
 
  text("Score: "+ score, 500,50)
  ground=createSprite(width/2,height-20,2*width,130)
  ground.shapeColor=("green")
  gameOver=createSprite(width/2,height/2 -50)
  gameOver.addImage("game",gameOverImg);
  gameOver.visible=false;
    gameOver.scale=0.3;
  restart=createSprite(width/2,height/2)
    restart.addImage("rest",restartImg);
   restart.visible=false;
   restart.scale=0.1;
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  coinGroup=new Group();
}

function draw() {
  background("lightblue");  
  //text(mouseX+":"+mouseY,100,100)
  textSize(28)
  fill("green")
  text("Score: "+ score, width/2,30);
  text("Coin Score: "+ coinScore, width/2 +200,30)
  if(gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);

if(touches.length > 0||keyDown("space") ) {
  boy.velocityY = -10;
  jump.play();
  touches = [];
}
for(var i=0;i<coinGroup.length;i++){
if(boy.isTouching(coinGroup.get(i))){
coinGroup.get(i).destroy()
coinScore=coinScore+1
coinCollect.play();
}
}
boy.velocityY = boy.velocityY + 1

if (ground.x < 0){
  ground.x = ground.width/2;
}


spawnClouds();
spawnObstacles();
spawnCoins();
    if(obstaclesGroup.isTouching(boy)){
    gameState=End;
    dead.play();
  }
}
else if(gameState===End){
  ground.velocityX=0;
  boy.velocityY=0;
  coin.velocityY=0;
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  coinGroup.setVelocityXEach(0)
  gameOver.visible=true;
  restart.visible=true;
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  
   //boy.changeAnimation("collided",boy_collided)
  if(mousePressedOver(restart)){
    reset();
  }
}
boy.collide(ground)

  drawSprites();
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
    ground.velocityX=-4-(score/4)
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    coinGroup.destroyEach();
    boy.changeAnimation("running",boy_running)
    score=0;
    coinScore=0;
  }

function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(width-50,height-125,40,10);
    obstacle.addAnimation("obstacle",obstacleImg);
    obstacle.setCollider("rectangle",0,0,100,100)
   obstacle.scale = 0.7;
    obstacle.velocityX = -4-(score/10)
    
     //assign lifetime to the variable
    obstacle.lifetime = width
    
    //adjust the depth
  
    
    //add each cloud to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var cloud = createSprite(width-70,height/2,40,10);
    cloud.y = Math.round(random(height-520,height-480,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.3;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = width
    
    //adjust the depth
  
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnCoins(){
  if(frameCount%80 === 0){
    coin = createSprite(width-50,height/2,40,10);
    coin.velocityX = -6;
    coin.y = random(height-800,height/2 +50);
    coin.addImage(coinImage);
    coin.scale = 0.06;
    coin.lifetime=width
    
    coinGroup.add(coin);
  }
}