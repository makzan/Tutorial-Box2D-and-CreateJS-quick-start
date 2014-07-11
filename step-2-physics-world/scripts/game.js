// Tutorial code for Box2D and CreateJS setup.

// a global game object.
var box2dgame = box2dgame || {};

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

// Entry point.
// unify local variable across scopes or games.
;(function(game, cjs){

  game.init = function() {
    console.log('Welcome to Box2D game.');

    game.canvas = document.getElementById('game-canvas');

    game.stage = new cjs.Stage(game.canvas);

    cjs.Ticker.setFPS(60);
    cjs.Ticker.addEventListener('tick', game.stage); // add game.stage to ticker make the stage.update call automatically.
    cjs.Ticker.addEventListener('tick', game.tick); // gameloop

    game.createWorld(0, 9.8); // with giver gravity.
    game.showDebugDraw();

    // Edit the following function to fit your needs.
    game.create2TestObjects();
  };

}).call(this, box2dgame, createjs);

// Game Loop
;(function(game, cjs){
  game.tick = function(){
    if (cjs.Ticker.getPaused()) { return; } // run when not paused

    game.updatePhysics();

  };
}).call(this, box2dgame, createjs);

// Physics Logic
;(function(game, cjs, b2d){
  // Box2D uses meters and we use pixels.
  var pxPerMeter = 30; // 30 pixels = 1 meter.

  // a flag for Box2D’s debug drawing enabling.
  var shouldDrawDebug = false;

  // create the world with given gravity value.
  game.createWorld = function(gravityX, gravityY) {
    var gravity = new b2Vec2(gravityX, gravityY);
    this.world = new b2World(gravity, /*allow sleep= */ true);
  }

  // edit this function to fit your needs.
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

  game.updatePhysics = function() {
    this.world.Step(1/60, 10, 10);
    if (shouldDrawDebug) {
      this.world.DrawDebugData();
    }
    this.world.ClearForces();
  };

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

}).call(this, box2dgame, createjs, Box2D);

// Start the game
box2dgame.init();
