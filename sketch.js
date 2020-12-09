//Creating variables for all pics(devi,asur,background)
var mahakali, mahakali_img, maaKhamakhya, maaKhamakhya_img;
var asur_grp, asur1, asur2, asur3;
var fire, fire_img;

//Creating variables for all sounds(killing)
var kill_sound;

//Creating variables for gameStates and score
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;


function preload(){
  
 //loading animation for mahakali
  mahakali_img = loadAnimation("m1.png","m1.png","m2.png","m2.png","m3.png","m3.png");
  
  fire_img = loadImage("background.jpg");
  asur1 = loadImage("asura.png");
  asur2 = loadImage("asura2.png");
  asur3 = loadImage("asura3.png");
  kill_sound = loadSound("kill.mp3");
  maaKhamakhya_img = loadImage("MaaKhamakhyadevi.jpg");
  
}


function setup() {
  createCanvas(600, 300);

  fire = createSprite(0,0,600,300);
  fire.addImage(fire_img);
  fire.scale = 1;
  
  mahakali = createSprite(60,150);
  mahakali.addAnimation("jai_maakali",mahakali_img);
  mahakali.scale = 0.7;
  
  score = 0;
  
  asur_grp = new Group();
  
}

function draw() {
  
  if(gameState === PLAY){

          
  fire.velocityX = -3;
     
       if(fire.x<0){
          fire.x = fire.width/2;
       }
       
       if(keyDown("space")){
         asur_grp.destroyEach();  
         score = score + 1;
         kill_sound.play();
       }
      if(score === 500){
        gameState = END;
      }
       
       
  spawnAsurs();
  
  } else if(gameState === END){
    
    asur_grp.setVelocityEach(0);
    score = 100;
    
    maaKhamakhya = createSprite(300,120,600,300);
    maaKhamakhya.addImage(maaKhamakhya_img);
    maaKhamakhya.scale = 1;
    stroke("BLUE  ");
    textSize(20);
    fill("BLUE");
    text("As you have killed all 150 asurs U WIN ",150,200);
    
  }
  
  drawSprites();
  textSize(19); 
  text("no.of asurs killed: "+score, 40, 50);

  
}

function spawnAsurs(){
  
  if(frameCount%100 === 0){
    
    var asur = createSprite(570,150,50,50);
    asur.velocityX = -6;
    
    //generate random asurs
    var rand = Math.round(random(1,3));
    switch(rand){
        
      case 1: asur.addImage(asur1);
              break;
      case 2: asur.addImage(asur2);
              break;
      case 3: asur.addImage(asur3);
              break;
      default:break; 
        
    }
    
    //assign scale and lifetime to the obstacle           
    asur.scale = 0.2;
    asur.lifetime = 300;
    
    //add each obstacle to the group
    asur_grp.add(asur);
    
    asur.depth = mahakali.depth;
    mahakali.depth = mahakali.depth+1;
    
  }
  
  
}






