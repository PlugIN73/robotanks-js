function add_new_tank(tank) {
  var draw = canvas.display.rectangle({
      x: tank.pos_x,
      y: tank.pos_y,
      width: tank.width,
      height: 100,
      fill: "#0aa"
  });
  canvas.addChild(sprite);
}