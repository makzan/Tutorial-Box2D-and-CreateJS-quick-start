// Tutorial code for Box2D and CreateJS setup.

// a global game object.
var box2dgame = box2dgame || {};


// Entry point.
// unify local variable across scopes or games.
;(function(game, cjs){

  game.init = function() {
    console.log('Welcome to Box2D game.');

    game.canvas = document.getElementById('game-canvas');

    game.stage = new cjs.Stage(game.canvas);

    cjs.Ticker.setFPS(60);
    cjs.Ticker.addEventListener('tick', game.tick); // gameloop

  };

}).call(this, box2dgame, createjs);

// Game Loop
;(function(game, cjs){
  game.tick = function(){
    if (cjs.Ticker.getPaused()) { return; } // run when not paused

    game.stage.update(); // reflect drawing on canvas
  };
}).call(this, box2dgame, createjs);

// Physics Logic
;(function(game, cjs, b2d){


}).call(this, box2dgame, createjs, Box2D);

// Start the game
box2dgame.init();
