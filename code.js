var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["d7470557-a786-4efc-bcc8-671747d4027e","b58fecc7-d6d5-445d-b67b-d35ed2ba637d"],"propsByKey":{"d7470557-a786-4efc-bcc8-671747d4027e":{"name":"pink_monster_1","sourceUrl":null,"frameSize":{"x":242,"y":285},"frameCount":1,"looping":true,"frameDelay":12,"version":"BA__kwW6VaqrxLq.v4zuclKnpaguYUvy","categories":["fantasy"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":242,"y":285},"rootRelativePath":"assets/d7470557-a786-4efc-bcc8-671747d4027e.png"},"b58fecc7-d6d5-445d-b67b-d35ed2ba637d":{"name":"gameplay_yellowstar2_1","sourceUrl":null,"frameSize":{"x":400,"y":390},"frameCount":1,"looping":true,"frameDelay":12,"version":"gYnSbJufmaz1.SrTgsKeFwx5WxtV1i7M","categories":["video_games"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":390},"rootRelativePath":"assets/b58fecc7-d6d5-445d-b67b-d35ed2ba637d.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var player = createSprite(200, 200, 20, 30);
player.setAnimation("pink_monster_1");
player.scale = 0.5;

var ground = createSprite(200, 375, 400, 50);
ground.shapeColor = "darkBlue";

var score = 0;

var platform1 = createSprite(750, randomNumber(50, 125), 100, 10);
platform1.shapeColor = "darkBlue";

var platform2 = createSprite(600, randomNumber(150, 200), 100, 10);
platform2.shapeColor = "darkBlue";

var platform3 = createSprite(450, randomNumber(225, 300), 100, 10);
platform3.shapeColor = "darkBlue";

var coinSpawn;

var coin = createSprite(platform3.x, platform3.y - 30);
coin.setAnimation("gameplay_yellowstar2_1");
coin.scale = 0.1;

var gravity = 0;

var gameState = "start";

playSound("assets/category_loops/show_me_a_hero_middle_loop.mp3", true);


function draw() {
  
  background("orange");
  
  player.velocityX = 0;
  player.velocityY = 0;
  
  if(gameState == "start"){
    
    textSize(25);
    stroke("blue");
    text("Welcome, press space to start!", 25, 100);
    
    if(keyDown("space")){
      player.x = 50;
      player.y = 325;
      player.scale = 0.175;
      
      gameState = "play";
      
      coin.velocityX = -5;
      
      platform1.velocityX = -5;
      platform2.velocityX = -5;
      platform3.velocityX = -5;
      ground.velocityY = 0.5;
    }
    
  }
  
  if(gameState == "play"){
    movePlayer();
    
    textSize(15);
    fill("darkBlue");
    text("Score: " + score, 10, 20);
    
    player.y += gravity;
    
    if(gravity < 15){
      gravity += 1;
    }
    
    if (gravity == 15) {
      if(keyWentDown("space")){
        gravity = -20;
      }
    }
    
    if(platform1.x < -50){
      platform1.x = 450;
      platform1.y = randomNumber(50, 125);
    } 
    
    if(platform2.x < -50){
      platform2.x = 450;
      platform2.y = randomNumber(150, 200);
    } 
    
    if(platform3.x < -50){
      platform3.x = 450;
      platform3.y = randomNumber(225, 300);
    } 
      
    if(coin.x < -30){
      genCoin();
    }  

    if(player.isTouching(coin)){
      genCoin();
      score ++;
      playSound("assets/category_achievements/lighthearted_bonus_objective_1.mp3", false);
      
    }
    
    if(player.y > 420 || player.x < -20){
      gameState = "end";
      player.destroy();
    }
    
    if(ground.y>430){
      ground.destroy();
    }
  }
  
  if(gameState == "end"){
    textSize(25);
    fill("darkBlue");
    text("GAME OVER!!!", 120, 200);
    
    textSize(15);
    fill("darkBlue");
    text("Score: " + score, 10, 20);
    
    stopSound("assets/category_loops/show_me_a_hero_middle_loop.mp3");
    
  }
  
  createEdgeSprites();
  player.bounceOff(platform1);
  player.bounceOff(platform2);
  player.bounceOff(platform3);
  player.bounceOff(ground);
  
  drawSprites();
}

function movePlayer() {
  if(keyDown("left")) {
    player.x += -4;
  }
  if(keyDown("right")) {
    player.x += 4;
  }
}

function genCoin() {
  coinSpawn = randomNumber(1, 3);
  if(coinSpawn == 1){
    coin.x = platform1.x;
    coin.y = platform1.y - 30;
  }
      
  if(coinSpawn == 2){
    coin.x = platform2.x;
    coin.y = platform2.y - 30;
  }
      
  if(coinSpawn == 3){
    coin.x = platform3.x;
    coin.y = platform3.y - 30;
  }

}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
