var backgroundImg, background;
var man, manImg, manImgstop
var invisibleGround
var blocksGroup

var score = 0;

var PLAY = 1
var END = 0
var gameState = PLAY


function preload(){

    backgroundImg = loadImage("bg.jpg")
    manImg = loadAnimation("1.png", "2.png", "3.png")
    manImgstop = loadImage("2.png")
    blockImg = loadImage("block.png")
    blockImg2 = loadImage("block2.png")
    blockImg3 = loadImage("block3.png")


    jump = loadSound("jump.mp3")
    gameover = loadSound("gameover.mp3")
    hit = loadSound("hit.mp3")

}

function setup() {

    createCanvas(1400, 600);
    background = createSprite(840,300);
    background.addImage(backgroundImg);
    background.velocityX = -17;

    man = createSprite(100, 455)
    man.addAnimation("runner",manImg)
    man.scale = 0.8


    blocksGroup = createGroup()
    
    invisibleGround = createSprite(700, 510, 1400, 4)
    invisibleGround.visible = false

    
 
}

function draw() {


    if(gameState == PLAY){

        score = score + round( getFrameRate() / 60)


    if (background.x < 550){
        background.x = 820;
      }

    man.velocityY = man.velocityY + 2

    if(keyDown("space") && man.y>=455){
        man.velocityY = -30
        jump.play()
    }
    if(keyDown("up_arrow") && man.y>=455){
        man.velocityY = -30
        jump.play()
    }

    if(man.isTouching(blocksGroup)){
        gameState = END
        gameover.play()
        hit.play()
    }


    man.velocityY = man.velocityY + 0.8

    spawnBlock()

 }

 else if(gameState == END){

    fill("white")
    textFont("Pixelade")
    textSize(50)
    strokeWeight(3)
    stroke("black")
    text("Score: " + score, 620, 100)


    fill("white")
    textFont("Pixelade")
    textSize(120)
    strokeWeight(4)
    stroke("black")
    text("Game Over", 500, 200)

    textSize(40)
    strokeWeight(2)
    text("Refresh the page to play again", 510, 250)


    man.velocityY = 0

    invisibleGround.velocityX = 0

    man.changeAnimatin("collided",manImgstop)


 } 
    man.collide(invisibleGround);
    man.collide(blocksGroup);
    drawSprites()
 
}

function spawnBlock(){
    if (frameCount % 70 == 0){

        block = createSprite(1405, 480)
        block.addImage(blockImg)
        block.velocityX = -17
        block.scale = 0.34

        randnum = round(random(1, 3))

        switch(randnum){

            case 1: block.addImage(blockImg)
            break;
            
            case 2: block.addImage(blockImg2)
            break;
            
            case 3: block.addImage(blockImg3)
            break;

            default: break ;
        }
    

        blocksGroup.add(block)

    }

}