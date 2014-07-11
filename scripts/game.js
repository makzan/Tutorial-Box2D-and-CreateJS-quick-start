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
;(function(game, cjs, b2d){

  var pxPerMeter = 30; // 30 pixels = 1 meter. Box2D uses meters and we use pixels.
  var shouldDrawDebug = false;

}).call(this, box2dgame, createjs, Box2D);
