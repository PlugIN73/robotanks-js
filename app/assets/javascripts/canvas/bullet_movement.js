function move_bullet(bullet) {

    var x = bullet.x - bullet.width / 2;
    var y = bullet.y - bullet.height / 2;
    var path = "X = " + x + ' Y = ' + y + " Angle = " + bullet.angle;
    bullet["object"].rotateTo(-bullet.angle);
    bullet["object"].moveTo(x, y);
    bullet.need_draw = 0;
}

function draw_bullet(bullet){
//  bullet["object"] = canvas.display.rectangle({
//      x: (bullet.x - bullet.width / 2),
//      y: (bullet.y - bullet.height / 2),
//      width: bullet.width,
//      height: bullet.height,
//      fill: "#0aa"});
    bullet["object"] = canvas.display.image({
        x: (bullet.x - bullet.width / 2),
        y: (bullet.y - bullet.height / 2),
        origin: { x: "center", y: "center" },
        width: bullet.width,
        height: bullet.height,
        image: "user_tank.png"
    });
    canvas.addChild(bullet["object"]);
}

function draw_bullets() {
    for (var key in bullets){
        if (bullets[key]["object"]){
            move_bullet(bullets[key]);
        } else {
            draw_bullet(bullets[key]);
        }
        bullets[key].need_draw = 1;
    }
    for (var key in bullets){
        if (bullets[key].need_draw == 0){
            canvas.removeChild(bullets[key]["object"]);
//            canvas.canvas.clearRect(bullets[key].x - bullets[key].width / 2 - 5, bullets[key].y - bullets[key].height / 2 - 5, bullets[key].width + 5, bullets[key].height + 5);
            delete bullets[key];
        }
    }
}