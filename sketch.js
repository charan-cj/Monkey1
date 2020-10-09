
var monkey , monkey_running;
var banana ,bananaImage,banana1,banana1Image, obstacle, obstacleImage,obstacle1;
var FoodGroup, obstacleGroup;
var score;
var background12,background1;
var inv;
var start = 0;
var play =1;
var end = 2;
var gameState = start;
var jump;
var score = 0;
var reset,reset1;
var gameover1,gameover;
var hitToOb;
 var srv = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("ba-cutout.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  background12 =loadImage("spring-forest-landscape-never-ending-vector-nature-background-separated-layers-game-design-74498476.jpg");
  
  obstacleGroup = new Group();
  
   bananaGroup = new Group();
  
  jump = loadSound("salamisound-5189814-sfx-jump-4-game-computer.mp3");
  
  collect = loadSound("salamisound-8720612-table-bell-strike-once-can.mp3");
  reset = loadImage("reset1.png");
  gameover = loadImage("game1.png");
  hitToOb = loadSound("punch2.mp3");
  banana1Image = loadImage("banana6.jpg");
  // banana1.scale = 0.05;
}



function setup() {
  createCanvas(900,470);
  background("white");
  
  background1 = createSprite(400,250,800,500);
  background1.addImage("jungle",background12);
  background1.scale =1.7;
  
  monkey = createSprite(100,400,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;
  reset1 = createSprite(370,340,20,20);
  reset1.addImage(reset);
  reset1.scale = 0.2;
  
  gameover1 = createSprite(370,280,20,20);
  gameover1.addImage(gameover);
  gameover1.scale = 0.2;
  
  inv  = createSprite(00,460,2000,20);
  
  banana1 = createSprite(900,280,30,30);
  banana1.addImage("obstacle",bananaImage);
  banana1.scale =0.05;
  banana1.velocityX = -(15+score/10)  ;
  banana1.lifetime
  bananaGroup.add(banana1); 
  bananaGroup.setLifetimeEach(150);
  
}


function draw() {
  background("white");
  
  // monkey.setCollider(0,40,40);
  monkey.collide(inv);
  monkey.setCollider("rectangle",0,0,450,500);
  monkey.debug = true
  
  inv.visible = false;
//   destroy function
 if (monkey.isTouching(obstacleGroup)){
   gameState = end;
   background1.velocityX =0;
   hitToOb.play();
   obstacle.destroy();
   obstacles();
  obstacleGroup.setVelocityXEach(0);
}
  
  // giving gameState
 if (gameState === play){
    srv =Math.ceil(frameCount/frameRate());
    text("survival time = "+srv,100,50);
   // gameover1.visible = false;
    background1.velocityX =-3;
    if (background1.x<220){
      background1.x = background1.width/2;
  }
    // banana2();
    banana12();
    banana123();
    obstacles();
    //    destroy function
   if(monkey.isTouching(banana1)){
     
     banana1.destroy();
     collect.play();
     score  =score+1;
     gameover1.visible = false;
    reset1.visible = false;
   }
   if(monkey.isTouching(bananaGroup)){
     banana.destroy();
     collect.play();
     score  =score+1;
     gameover1.visible = false;
    reset1.visible = false;
   }
  }
  
//   jump function
  if(keyDown("space")&& monkey.y  >= 400 && gameState === play ) {
    monkey.velocityY = -16;
    jump.play();   
  }
  
//   game Start
  if (mousePressedOver(background1)&& gameState === start){
    gameState  =play;
  }
  
  drawSprites();
   // giving gameState
  if (gameState === start){
    fill("white")
    textSize(20)
    text ("Click here to Start",310,300);
    text ("use space to jump",310,330);
    gameover1.visible = false;
    reset1.visible = false;
   
  }
//   rest function
   if(mousePressedOver(reset1)) {
    reset12();
     
    }
//   gameState = end
    if (gameState === end){
    gameover1.visible = true;
    reset1.visible = true;
    // text ("use space to jump",310,330);
    obstacles();
    obstacleGroup.setVelocityXEach(0);
    banana12();
    bananaGroup.setVelocityXEach(0);
    fill("white");
    textSize(20);
    text ("press reset to restart",290,200);
    
  }
  
//  score display
  fill("white");
  textSize(25);
  text ("score = "+score,700,50);
  monkey.velocityY = monkey.velocityY + 0.8;
 
}


// funcition creating obstacle
function obstacles(){
if (World.frameCount %110==0 ){
  obstacle = createSprite(900,440,30,30);
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale =0.25;
  obstacle.velocityX = -(15+score/10)  ;
  obstacleGroup.add(obstacle);
  obstacle.setCollider("rectangle",0,0,450,500);
  obstacle.debug = true;
  obstacleGroup.setLifetimeEach(150);
}
}
// funcition creating banana
function banana12(){
if (World.frameCount %110==0 ){
  banana = createSprite(900,280,30,30);
  banana.addImage("obstacle",bananaImage);
  banana.scale =0.05;
  banana.velocityX = -(15+score/10)  ;
  banana.lifetime
  bananaGroup.add(banana); 
  bananaGroup.setLifetimeEach(150);
}
}
// function rest
function reset12(){
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  gameState  = start;
  score = 0;
}

function banana123(){
if (World.frameCount %80==0 ){
  banana1 = createSprite(900,280,30,30);
  banana1.addImage("obstacle",bananaImage);
  banana1.scale =0.05;
  banana1.velocityX = -(15+score/10)  ;
  banana1.lifetime
  bananaGroup.add(banana1); 
  bananaGroup.setLifetimeEach(150);
}
}
