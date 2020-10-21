var play = 1;
var end = 0;
var gamestate = 1;

var monkey,monkeyImage;
var ground,jungleImage;
var Score;
var obstacleGroup,bananaGroup;

function preload()
{
  monkeyAnimation = loadAnimation ("Monkey_01.png","Monkey_02.png","Monkey_03.png",
"Monkey_04.png","Monkey_05.png","Monkey_06.png",
"Monkey_07.png","Monkey_08.png","Monkey_09.png",
"Monkey_10.png");
  
 jungleImage = loadImage("jungle.jpg");
  stoneImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png");
}

function setup() 
{
  createCanvas(550,550);
  
  ground = createSprite(250,250)
  ground.addImage("jungle",jungleImage);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  
  ground2 = createSprite(200,480,5000,10);
  ground2.visible = false;

  monkey = createSprite(100,450);
  monkey.addAnimation("running",monkeyAnimation);
  monkey.scale = 0.1;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  Score =0;
}

function draw() 
{
  background("black");
  
  if(gamestate === play)
{
  if (ground.x < 0)
  {
     ground.x = ground.width/2;
  }  
    
   if(keyDown("space")&& monkey.y >= 300) 
   {
    monkey.velocityY = -12;
   }
  
  monkey.velocityY = monkey.velocityY +0.8;
  monkey.collide(ground2);
  
  if(bananaGroup.isTouching(monkey))
    {
      bananaGroup.destroyEach();
      Score = Score + 1;
    }
  if(obstacleGroup.isTouching(monkey))
    {
      gamestate = end;
    }
  
  if(Score === 5)
    {
      obstacleGroup.scale = 0.4;
    }
  
  if(Score === 10)
    {
      monkey.scale = 0.2;
    }

}
  else if(gamestate === end)
    {
      if( obstacleGroup.isTouching(monkey))
        {
        fill("red");
        textSize(20);
        text("gameOver?",200,250);
        monkey.setVelocityY(2,-2);
        obstacleGroup.setVelocityY(-2,2);
        bananaGroup.setVelocityY(2,3);
        }
    }
  
  obstatcle();
  bananas();
  
  monkey.collide(ground2);
  
  drawSprites();
  fill ("blue");
  textSize(20);
  text("Score:" + Score,250,100);
}

function obstatcle()
{
  if(frameCount % 60=== 0)
    {
      var stone = createSprite(500,460,20,20);
      stone.x = Math.round(random(600,460  ))
      stone.addImage("stone",stoneImage); 
      stone.scale = 0.1
      stone.velocityX =-9;
      stone.lifetime = 100;
      obstacleGroup.add(stone);
       if(Score === 5)
    {
      stone.scale = 0.4;
    }
      
    }
}

function bananas()
{
 if(frameCount % 60 === 0)
   {
     var banana = createSprite(500,340,20,20);
     banana.y = Math.round(random(300,300))
     banana.addImage("banana",bananaImage);
     banana.scale = 0.1;
     banana.velocityX = -9;
     banana.lifetime = 100;
     bananaGroup.add(banana);
   }
}

