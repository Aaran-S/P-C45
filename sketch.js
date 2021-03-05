var ground;
var baby, parent;
var lane1, lane2, lane3;
var leftButton, rightButton;
var furnitureGroup, candyGroup;
var textImg;
var staticBaby, staticParent;

var gameState = "Ready";

var candyScore = 0;


var lives = 165;

function preload(){

  groundImg = loadImage("Images/FloorGame.jpg")

  babyImg = loadImage("Images/BabyGame.png")

  chairImg = loadImage("Images/ChairGame.png")

  candyImg = loadImage("Images/CandyGame.png")

  parentImg = loadAnimation("ParentGame.png", "ParentGame2.png")

  textImg = loadImage("Images/FloorText.jpg")

  staticParentImg = loadImage("ParentGame.png")
  
  staticBabyImg = loadImage("Images/BabyGame.png")


}

function setup(){
  createCanvas(windowWidth, windowHeight)
  
  ground = createSprite(windowWidth/2, windowHeight/2);
  ground.addImage(groundImg)
  ground.scale = 3.7
  ground.velocityY = 10;

  startButton = createButton("Start")
  startButton.position(windowWidth/2 - windowWidth/8, windowHeight/2)

  restartButton = createButton("Restart")
  restartButton.position(windowWidth/2 + windowWidth/8, windowHeight/2)

  quitButton = createButton("Quit")
  quitButton.position(windowWidth/2 + windowWidth/1024, windowHeight/2)

  lane1 = createSprite(windowWidth/4, windowHeight/2, 10, windowHeight)
  lane1.shapeColor = ("black")

  lane2 = createSprite(windowWidth/4 + windowWidth/4, windowHeight/2, 10, windowHeight)
  lane2.shapeColor = ("black")

  lane3 = createSprite(windowWidth/4 + windowWidth/2, windowHeight/2, 10, windowHeight)
  lane3.shapeColor = ("black")

  baby = createSprite(windowWidth/2, windowHeight - windowHeight/4)
  baby.addAnimation("babyAnimation", babyImg)
  baby.scale = 0.2

  leftButton = createButton("ᐊ")
  leftButton.position(windowWidth/10, windowHeight - windowHeight/10)

  rightButton = createButton("ᐅ")
  rightButton.position(windowWidth/1.138 , windowHeight - windowHeight/10)

  parent = createSprite(baby.x, windowHeight + 100)
  parent.addAnimation("parentAnimation", parentImg)
  parent.scale = 0.9
  
  furnitureGroup = new Group();
  candyGroup = new Group();
  
}

function draw(){
  background(0);

  //console.log(windowHeight)

  console.log(baby.depth)
  console.log(parent.depth)
  console.log(ground.depth)


  if(gameState === "Play"){
    spawnObstacles();
    spawnCandy();
    
    parent.x = baby.x;

    if(ground.y > windowHeight - windowHeight/7){
      ground.y = windowHeight/2
    }
  
    leftButton.mousePressed(()=>{
      baby.x -= windowWidth/8
    })
  
    rightButton.mousePressed(()=>{
      baby.x += windowWidth/8
    })

    if(furnitureGroup.isTouching(baby) && lives <= 0) {
     gameState = "End";

   }
    if(furnitureGroup.isTouching(baby) && lives>=1){
       parent.y -= 1.4;
       lives  = lives - 1
    }

  
    if(parent.y === baby.y - 150){
      gameState = "End"
    
    }
    
    if(candyGroup.isTouching(baby)){
      candyScore = candyScore + 1;
    }

  }
  
    if(gameState === "End"){
      imageMode(CENTER)
      image(textImg, windowWidth/2, windowHeight/2, windowWidth,windowHeight)
      
      restartButton.show();
      quitButton.show();

       
}

    restartButton.mousePressed(()=>{
      quitButton.hide()
      restartButton.hide()
      lives = 165
      
      gameState = "Play";



    })

  drawSprites();

  textSize(40)
  fill(0)
  text("Candy : " + Math.round(candyScore/20), windowWidth - windowWidth/6, windowHeight/9)
  
  text("Lives : " + Math.round(lives/33), windowWidth - windowWidth/6, windowHeight/ 5)

  if(gameState === "Ready"){
    imageMode(CENTER)
    
    image(groundImg, windowWidth/2, windowHeight/2, windowWidth,windowHeight)
    
    image(staticBabyImg, windowWidth/8, windowHeight/4, 200, 240)
    
    image(staticParentImg, windowWidth/2, windowHeight/2)
    
    image(chairImg, windowWidth - windowWidth/8, windowHeight/4, 600,400)

    image(candyImg, windowWidth/2, windowHeight - windowHeight/8, 400, 360)

    restartButton.hide()
    
    fill("black")
    textSize(40)
    text("        Help the baby escape the parent, while collecting candy along the \n     way and avoiding dangerous obstacles that could make you get caught! \n        Using the arrow keys, dodge the chairs and escape the parent!", windowWidth/10, windowHeight/8)

    startButton.mousePressed(()=>{
      startButton.hide()
      quitButton.hide()
      gameState = "Play"
    })
     
    quitButton.mousePressed(()=>{
      startButton.hide()
      quitButton.hide()
      restartButton.hide()
      
      gameState = "Quit";
    })
  }
  
  if(gameState === "Quit"){
    imageMode(CENTER)
    image(groundImg, windowWidth/2, windowHeight/2, windowWidth,windowHeight)
    fill("black")
    textSize(40)
    text("Thank you for playing, I hope you come back! \n                                      :) ", windowWidth/4, windowHeight/4)
  }
}

function spawnObstacles(){
  
  if(frameCount%249===0){

    furniture = createSprite(windowWidth/2 ,-50)
    
    //var a = Math.round(random(windowWidth/20, windowWidth - windowWidth/20))
    var a = windowWidth/4 - windowWidth/8;
    var b = windowWidth/4 + windowWidth/4 - windowWidth/8;
    var c = windowWidth/4 + windowWidth/4 + windowWidth/4 - windowWidth/8;
    var d = windowWidth/4 + windowWidth/4 + windowWidth/4 + windowWidth/4 - windowWidth/8;
  
    var r = Math.round(random(1,4))

    switch(r){
      case 1 : furniture.x = a;
      break;
      case 2 : furniture.x = b;
      break;
      case 3 : furniture.x = c;
      break;
      case 4 : furniture.x = d;
      break;
      default : break;
    }
    
    
    furniture.addImage(chairImg)
    furniture.velocityY = ground.velocityY;
    furniture.scale = 0.4
    furniture.depth = baby.depth
    baby.depth++;
    parent.depth++
    furnitureGroup.add(furniture);
    
  }
}

function spawnCandy(){
    
  if(frameCount%159===0){
    
    candy = createSprite()

    var a = windowWidth/4 - windowWidth/8;
    var b = windowWidth/4 + windowWidth/4 - windowWidth/8;
    var c = windowWidth/4 + windowWidth/4 + windowWidth/4 - windowWidth/8;
    var d = windowWidth/4 + windowWidth/4 + windowWidth/4 + windowWidth/4 - windowWidth/8;
  
    var r = Math.round(random(1,4))

    switch(r){
      case 1 : candy.x = a;
      break;
      case 2 : candy.x = b;
      break;
      case 3 : candy.x = c;
      break;
      case 4 : candy.x = d;
      break;
      default : break;
    }
    
    
    candy.addImage(candyImg)
    candy.velocityY = ground.velocityY;
    candy.scale = 0.08
    candy.depth = baby.depth
    baby.depth+=2;
    candyGroup.add(candy);
    
  }


}
