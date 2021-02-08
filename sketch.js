var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,last,lastImage,obstacleImage,obstacle;

var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  //loading animations and Images
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  anime=loadAnimation("runner1.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  lastImage =loadImage("gameOver.png");
  obstacleImage=loadImage("traffic.webp");
}

function setup(){
  
  createCanvas(400,400);
//creating the path
  path=createSprite(200,200);
  path.addImage(pathImg);
  
//creating boy running
  boy = createSprite(70,330,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  
 //creating groups for the sprites 
   cashG=new Group();
   diamondsG=new Group();
   jwelleryG=new Group();
   swordGroup=new Group();
   obstacleG=new Group();
  
   boy.setCollider("circle",0,0,500);
   //boy.debug = true;
}

function draw() {

  background(0);
  
  //making the boy to collide with the ground
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(gameState === PLAY){

    
//moving the boy using the mouse
  boy.x = World.mouseX;
   
//Giving velocity to the ground
  path.velocityY = (4 + (treasureCollection/400)) ;
    
//reseting the background
  if(path.y > 400 ){
    path.y = height/2;
  }   
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    createObstacles();
    
    
if(boy.isTouching(swordGroup)||boy.isTouching(obstacleG)){
  //stoping the path to move if the boy touches the swordsG or the obstacleG
   path.velocityY=0;
  //destroying all the treasure if the game is in end state
  diamondsG.destroyEach();
    jwelleryG.destroyEach();
    cashG.destroyEach();
  
  //texting GameOver when the boy touches the swordG or the obstacleG
   last=createSprite(200,200,100,10);
   last.addImage(lastImage);
   last.scale=0.5
  
//making the boy pause if the boy touches the swordsG or the obstacleG  
   boy.pause();
  
  gameState = END;
}      
 else if (gameState === END) {
    path.velocityY=0;
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    cashG.destroEachy();

    cash.velocityY = 0;
    diamond.velocityY = 0;
    jwellery.velocityY = 0;
    sword.velocityY = 0;
    obstacle.velocityY = 0;
   
//code to stop making the treasure to disappear if the boy touches the swordsG or the obstacle G 
    diamondsG.setLifetimeEach(-1);
    cashG.setLifetimeEach(-1);
    swordGroup.setLifetimeEach(-1);
    jwelleryG.setLifetimeEach(-1);
   obstacleG.setLifetimeEach(-1);
    
}
  
  }  
//collecting treasure if the boy touches cash,jwellery & diamonds
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+250
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+400
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
    }else{
      if(obstacleG.isTouching(boy)){
        obstacleG.destroyEach();
  }
}
  

  drawSprites();
  textSize(20);
  fill("orange");
  text("Treasure: "+ treasureCollection,150,30);

}
//creating cash
function createCash() {
  if (World.frameCount % 600 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = (3+(treasureCollection/400));
  cash.lifetime = 150;
  cashG.add(cash);
  }
}
//creating Diamonds
function createDiamonds() {
if (World.frameCount % 470 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = (3+(treasureCollection/400));
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
 }
}
//creating jewellery
function createJwellery() {
  if (World.frameCount % 350 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = (3+(treasureCollection/400));
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}
//creating swords
function createSword(){
  if (World.frameCount % 100 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = (4 +(treasureCollection/400));
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
function createObstacles(){
 if (World.frameCount % 265 == 0) { 
   var obstacle = createSprite(Math.round(random(50, 350),40, 10, 10)); 
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.3;
   obstacle.velocityY = (4 +(treasureCollection/700));
   obstacle.lifetime = 150;
   obstacleG.add(obstacle);
  }
}
}