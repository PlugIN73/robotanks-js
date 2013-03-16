function add_new_tank(tank) {
  var draw = canvas.display.rectangle({
      x: (tank.x - tank.width / 2),
      y: (tank.y - tank.height / 2),
      width: tank.width,
      height: tank.height,
      fill: "#0aa"
  });
  canvas.addChild(draw);
}

function draw_tanks() {
  for (var key in tanks){
      add_new_tank(tanks[key]);
  }
}

function reload_map(){
    $("#canvas").width = width;
    $("#canvas").height = height;
    canvas.reset();
}