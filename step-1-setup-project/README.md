# Step 1 – Set up the project

In this step, we create the folder structure and touch essential files.

Here is the folder structure we need for this project.

```
index.html
images/
scripts/
scripts/game.js
styles/
styles/style.css
vendors/
vendors/box2dweb-2.1.a.3.js
```

`vendors` folder is often used for 3rd party libraries that the project depends. In this case, we have Box2DWeb code placed there. If we also host our CreateJS library, we will place the related files in this folder too.

In the `index.html` file, we load the styles and scripts files. The EaselJS library are loaded directly from CDN.

``` html
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <title>Tutorial – Box2D and CreateJS quick start</title>
  <link rel='stylesheet' href='styles/style.css'>
</head>
<body>

  <!-- unless necessary, scripts are placed at the end of the body. -->
  <script src='vendors/box2dweb-2.1.a.3.min.js'></script> <!-- Box2DWeb-->
  <script src='http://code.createjs.com/easeljs-0.7.1.min.js'></script> <!-- EaselJS on CDN -->
  <script src='scripts/game.js'></script> <!-- our game logic -->
</body>
</html>
```

* * *

[→ Next step – Physics world](https://github.com/makzan/Tutorial-Box2D-and-CreateJS-quick-start/tree/master/step-2-physics-world/)