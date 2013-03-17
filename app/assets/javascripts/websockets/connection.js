function connect(){
    ws = new WebSocket("ws://192.168.30.129:5555/");
    // и навешивает на новый объект три колл-бека:

    // первый вызовется, когда соединение будет установлено:
    ws.onopen = function() {
        alert("Spectrator connection opened...");
//        ws.send(JSON.stringify({role: "observer"}));
    };

    // второй - когда соединено закроется
    ws.onclose = function() {
        alert("Spectrator connection closed...")
    };

    // и, наконец, третий - каждый раз, когда браузер получает какие-то данные через веб-сокет
    ws.onmessage = function(evt) {
        parse_response(evt.data);
        draw_bullets();
        draw_tanks();
    };
}

function bot_connection(){
    ws_bot = new WebSocket("ws://192.168.30.129:5556/");

    ws_bot.onopen = function() {
        alert("Bot connection opened...");
//        ws_bot.send(JSON.stringify({role: "bot"}));
    };

    // второй - когда соединено закроется
    ws_bot.onclose = function() {
        alert("Bot connection closed...")
    };

    // и, наконец, третий - каждый раз, когда браузер получает какие-то данные через веб-сокет
    ws_bot.onmessage = function(evt) {
        parse_bot_json(evt.data)
    };
}

function disconnect(){
    ws.close();
    ws_bot.close();
}

function parse_response(data){
    var server_json = JSON.parse(data);
    if (server_json) {
        for(var key in server_json){
            if (key == "map"){
                height = server_json[key]["height"];
                width = server_json[key]["width"];
                reload_map();

                bots_height = server_json[key]["bots_height"];
                bots_width = server_json[key]["bots_width"];
            }

            if (key == "bots"){
                parse_bots(server_json[key]);
            }

            if (key == "bullets"){
                parse_bullets(server_json[key]);
            }
        }
    }
}

function parse_bots(bots){
    for(var key in bots){
        if (!tanks[bots[key]["id"]]){
            tanks[bots[key]["id"]] = new Tank({id:bots[key]["id"], width:bots_width, height:bots_height, x:bots[key]["x"], y:bots[key]["y"], angle:bots[key]["angle"]});
        }else{
            tanks[bots[key]["id"]].set_center(bots[key]["x"], bots[key]["y"]);
            tanks[bots[key]["id"]].angle = bots[key]["angle"];
        }
    }
    remove_unused_bots(bots);
}

function remove_unused_bots(bots){
  var bots_size = bots.length;
  if (bots_size == 0){
      for (var key in tanks){
          if (tanks[key]["object"])
              canvas.removeChild(tanks[key]["object"]);
          delete tanks[key];
      }
      return;
  }
  for (var key in tanks){
      for (var key_b in bots){
          if (bots[key_b].id == tanks[key].id){
              tanks[key].need_draw = 1;
              break;
          }
          tanks[key].need_draw = 0;
      }
      if (tanks[key]["object"] && tanks[key].need_draw == 0)
          canvas.removeChild(tanks[key]["object"]);
      if (tanks[key].need_draw == 0)
          delete tanks[key];
  }
}

function parse_bullets(data){
    for(var key in data){
        if (!bullets[data[key]["id"]]){
            bullets[data[key]["id"]] = new Bullet({id:data[key]["id"], x:data[key]["x"], y:data[key]["y"], angle:data[key]["angle"]});
        }else{
            bullets[data[key]["id"]].set_center(data[key]["x"], data[key]["y"]);
            bullets[data[key]["id"]].angle = data[key]["angle"];
        }
    }
    remove_unused_bullets(data);
}

function remove_unused_bullets(bulls){
    var bulls_size = bulls.length;
    if (bulls_size == 0){
        for (var key in bullets){
            if (bullets[key]["object"])
                canvas.removeChild(bullets[key]["object"]);
            delete bullets[key];
        }
        return;
    }
    for (var key in bullets){
        for (var key_b in bulls){
            if (bulls[key_b].id == bullets[key].id){
                bullets[key].need_draw = 1;
                break;
            }
            bullets[key].need_draw = 0;
        }
        if (bullets[key]["object"] && bullets[key].need_draw == 0)
            canvas.removeChild(bullets[key]["object"]);
        if (bullets[key].need_draw == 0)
            delete bullets[key];
    }
}

function parse_bot_json(data){

}