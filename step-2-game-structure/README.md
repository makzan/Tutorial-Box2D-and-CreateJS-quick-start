# Step 2 – Game structure

In this step, we create the logic structure for our game.

In the HTML, we create a game canvas for the EaselJS library to draw on it.

``` html
<section id='game'>
  <canvas id='game-canvas' width='300' height='400'></canvas>
</section>
```

In JavaScript, a global object `box2dgame` is created for namespacing, to avoid polluting the global scope.

``` javascript
var box2dgame = box2dgame || {};
```

Then we have the `init` function which act as the entry point of the entire game.

``` javascript
;(function(game, cjs){

  game.init = function() {
    console.log('Welcome to Box2D game.');

    game.canvas = document.getElementById('game-canvas');

    game.stage = new cjs.Stage(game.canvas);

    cjs.Ticker.setFPS(60);
    cjs.Ticker.addEventListener('tick', game.tick); // gameloop

  };

}).call(this, box2dgame, createjs);
```

At the end of the file, we start the game by invoking this function.

``` javascript
box2dgame.init();
```

The second module is the game loop. Now it mainly invoke the EaselJS stage drawing update.

``` javascript
// Game Loop
;(function(game, cjs){
  game.tick = function(){
    if (cjs.Ticker.getPaused()) { return; } // run when not paused

    game.stage.update(); // reflect drawing on canvas
  };
}).call(this, box2dgame, createjs);
```

The third module would be the physics logic. In this step, we just create the scope and leave the logic for next step.

``` javascript
// Physics Logic
;(function(game, cjs, b2d){

  // code to add here in next step.

}).call(this, box2dgame, createjs, Box2D);
```

* * *

[← Prev step – Set up the project](https://github.com/makzan/Tutorial-Box2D-and-CreateJS-quick-start/tree/master/step-1-setup-project/)

[→ Next step – Physcis world](https://github.com/makzan/Tutorial-Box2D-and-CreateJS-quick-start/tree/master/step-3-physics-world/)