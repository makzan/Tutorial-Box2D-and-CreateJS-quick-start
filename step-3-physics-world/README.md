# Step 3 – Physics World

In last step, we created a scope block dedicated for the physics logic.

``` javascript
// Physics Logic
;(function(game, cjs, b2d){

}).call(this, box2dgame, createjs, Box2D);
```

* * *

In this step, we code the logic for a minimal physics world.

In the HTML file, we add a `#debug-canvas` canvas tag after the `#game-canvas`. The debug canvas is for the drawing from Box2D’s debug code.

``` html
<section id='game'>
  <canvas id='game-canvas' width='300' height='400'></canvas> <!-- behind 'debug-canvas' -->
  <canvas id='debug-canvas' width='300' height='400'></canvas> <!-- in front of 'game-canvas' -->
</section>
```

In order the make the `#debug-canvas` and `#game-canvas` overlap together as layers, we add the following styles to `style.css` file. By setting both canvas tags with absolute position, we make them overlap to each other.

``` css
#game {
  position: relative;
  width: 300px;
  height: 400px;
}
#game > canvas {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #efefef;
}
```

* * *

Let’s move to the JavaScript logic.

In the `game.js` file, we define the following aliases for common Box2D classes.

``` javascript
// alias of common Box2D references
var b2Vec2 = Box2D.Common.Math.b2Vec2
, b2AABB = Box2D.Collision.b2AABB
, b2BodyDef = Box2D.Dynamics.b2BodyDef
, b2Body = Box2D.Dynamics.b2Body
, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
, b2Fixture = Box2D.Dynamics.b2Fixture
, b2World = Box2D.Dynamics.b2World
, b2MassData = Box2D.Collision.Shapes.b2MassData
, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
, b2DebugDraw = Box2D.Dynamics.b2DebugDraw
, b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef
, b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
;
```

Inside the scope for physics logic, we define the following 2 variables.

``` javascript
// Physics Logic
;(function(game, cjs, b2d){
  // Box2D uses meters and we use pixels.
  var pxPerMeter = 30; // 30 pixels = 1 meter.

  // a flag for Box2D’s debug drawing enabling.
  var shouldDrawDebug = false;
  
  ...
```

Then we code the function to create a physics world. Note that we are still putting the code inside the scope of physics logic.

``` javascript
// create the world with given gravity value.
game.createWorld = function(gravityX, gravityY) {
  var gravity = new b2Vec2(gravityX, gravityY);
  this.world = new b2World(gravity, /*allow sleep= */ true);
}
```

Then we define the update function which we will invoke it in the game-loop.

``` javascript
game.updatePhysics = function() {
  this.world.Step(1/60, 10, 10);
  if (shouldDrawDebug) {
    this.world.DrawDebugData();
  }
  this.world.ClearForces();
};
```

We need Box2D to represent the physics world and objects before we add our own grahpics. So we define the following debug draw logic. We put the logic into a function called `showDebugDraw` so we can easly toggle this debug drawing in later stage of development.

``` javascript
game.showDebugDraw = function() {
  shouldDrawDebug = true;

  //setup debug draw
  var debugDraw = new b2DebugDraw();
  debugDraw.SetSprite(document.getElementById('debug-canvas').getContext('2d'));
  debugDraw.SetDrawScale(pxPerMeter);
  debugDraw.SetFillAlpha(0.3);
  debugDraw.SetLineThickness(1.0);
  debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit); // we can define what to draw with these bitwise flags.
  this.world.SetDebugDraw(debugDraw);
};
```

Inside the `game.init` function, we setup our physics world by the following code. Add them before the end of the init function.

``` javascript
game.createWorld(0, 9.8); // with given gravity.
game.showDebugDraw();
```

This is how we setup Box2D in the CreateJS HTML5 game.

* * *

In order to see the effect of the physics world, we will create 2 testing objects. One is static and one is dynamic.

Inside the physics logic block, we add the following function which creates two object in the world.

``` javascript
game.create2TestObjects = function() {
  // body definition and fixture definition.
  // We need these definitions to create objects in physics world.
  var bodyDef = new b2BodyDef;
  var fixDef = new b2FixtureDef;

  fixDef.shape = new b2PolygonShape();
  fixDef.shape.SetAsBox(20/pxPerMeter, 20/pxPerMeter); // box dimension: 40x40 px.

  bodyDef.position.y = 100/pxPerMeter; // same Y position for both objects.

  // sample static object
  bodyDef.type = b2Body.b2_staticBody;
  bodyDef.position.x = 100/pxPerMeter; // on the left, hardcoded as 100px.

  // create a body in the world, then create a fixture inside the newly created body.
  this.world.CreateBody(bodyDef).CreateFixture(fixDef);

  // sample dynamic object
  bodyDef.type = b2Body.b2_dynamicBody;
  bodyDef.position.x = 200/pxPerMeter; // on the right, hardcoded as 200px.

  // create another body with fixture, based on the definitions.
  this.world.CreateBody(bodyDef).CreateFixture(fixDef);
};
```

Inside the game init function, we call the object-creation function after the game and world is set up.

``` javascript
game.create2TestObjects();
```

* * *

[← Prev step – Game structure](https://github.com/makzan/Tutorial-Box2D-and-CreateJS-quick-start/tree/master/step-2-game-structure/)