var gameState = "play"

var spaceship,space,star,asteroid,gameOver,YouWon
var spaceshipImg,spaceImg,starImg,asteroidImg,gameOverImg,YouWonImg
var score = 0;
var starG,asteroidG


function preload(){
spaceshipImg = loadImage("spaceship.png")
spaceImg = loadImage("space back.jpg")
starImg = loadImage("star.png")
asteroidImg = loadImage("asteroid.png")
gameOverImg = loadImage("go.png")
YouWonImg = loadImage("youwin.png")
}

function setup() {
 createCanvas(600,600)
 //create background
 space = createSprite(400,250)
 space.addImage(spaceImg)
 space.velocityY = 1

 spaceship = createSprite(330,100)
 spaceship.addImage(spaceshipImg)
 spaceship.scale = 0.2

 score = 0;

 gameOver = createSprite(300,300);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.3;
 gameOver.visible = false;

 youWin = createSprite(300,300);
 youWin.addImage(YouWonImg);
 youWin.scale = 0.5;
 youWin.visible = false;
 
 starG = new Group();
 asteroidG = new Group();
 spaceship.setCollider("rectangle",0,0,40,40);
 
}

function draw() {
  background(255)
  if(starG.isTouching(spaceship)){
    score =score+1
    starG.destroyEach()
  }
  if(gameState === "play"){
    if(keyDown("a")){
      spaceship.x = spaceship.x-3
    }

    if(keyDown("d")){
      spaceship.x = spaceship.x+3
    }

    if(keyDown("space")){
      spaceship.velocityY = -5
    }

    spaceship.velocityY = spaceship.velocityY+0.1

    spaceship.collide(starG)

  if(space.y>300){
    space.y = 250
  }
  }
  
  spawnStars();
  spawnAsteroids();

  if(asteroidG.isTouching(spaceship) ||  spaceship.y>600){
    spaceship.velocityY = 0
    gameState = "end"
   
  }

  if(spaceship.isTouching(starG)){
    score = score+1
    }
    if(gameState === "end"){
      
      space.velocityY = 0 
      gameOver.visible = true;
      
      asteroidG.destroyEach()
      starG.destroyEach()
    
      asteroidG.setVelocityYEach(0)
      starG.setVelocityYEach(0)
    
      asteroidG.setLifetimeEach(0)
      starG.setLifetimeEach(0)
    
      asteroidG.y = 700
      starG.y = 700
      
    }
    if((score>=5)){
      space.velocityY = 0 
      spaceship.velocityY = 0
      spaceship.velocityX = 0
      youWin.visible = true;
       
       asteroidG.destroyEach()
       starG.destroyEach()
     
      asteroidG.setVelocityYEach(0)
      starG.setVelocityYEach(0)
     
      asteroidG.setLifetimeEach(0)
      starG.setLifetimeEach(0)
     
     asteroidG.y = 700
     starG.y = 700     
     }
 drawSprites()

 textSize(30)
 fill("blue")
 stroke("blue")
 text("Score: "+ score, 10,50);


 if(gameState === "end"){
  textSize(20); 
  fill(255); 
  text("Press Up Arrow to Restart the game!", 200,50);
 }


 function spawnStars(){
  if(frameCount % 60 === 0){
    var star = createSprite(50,50)
    star.addImage(starImg)
    star.scale = 0.02
    star.x = Math.round(random(50,550))
    star.lifetime = 90
    star.velocityY = 5
    starG.add(star)
    star.depth = spaceship.depth
    spaceship.depth=+1
  }
 }

 function spawnAsteroids(){
  if(frameCount % 100 === 0){
    var asteroid = createSprite(90,50,20,20)
    asteroid.addImage(asteroidImg)
    asteroid.scale = 0.05
    asteroid.x = spaceship.x
    asteroid.x = Math.round(random(50,500))
    asteroid.lifetime = 90
    asteroid.velocityY = 5.5
    asteroidG.add(asteroid)
 }
}
}