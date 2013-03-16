function connect(){
    ws = new WebSocket("ws://192.168.30.197:5555/");
    // и навешивает на новый объект три колл-бека:

    // первый вызовется, когда соединение будет установлено:
    ws.onopen = function() {
        alert("Connection opened...");
        send({role: "observer"});
    };

    // второй - когда соединено закроется
    ws.onclose = function() {
        alert("Connection closed...")
    };

    // и, наконец, третий - каждый раз, когда браузер получает какие-то данные через веб-сокет
    ws.onmessage = function(evt) {
        parse_response(evt.data);
        draw_bullets();
        draw_tanks();
    };
}

function disconnect(){
    ws.close();
}

function send(msg){
    ws.send(msg);
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
  var bots_null = true;
  for (var key in tanks){
      for (var key_b in bots){
          bots_null = false;
          if (bots[key_b].id == tanks[key].id){
              continue;
          }
          tanks[key].need_draw = 0;
          break;
      }
      console.log(tanks);
      if (tanks[key]["object"] && (tanks[key].need_draw == 0 || bots_null == true))
          canvas.removeChild(tanks[key]["object"]);
      if (tanks[key].need_draw == 0 || bots_null == true)
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
    var bulls_null = true;
    for (var key in bullets){
        for (var key_b in bulls){
            bots_null = false;
            if (bulls[key_b].id == bullets[key].id){
                continue;
            }
            bullets[key].need_draw = 0;
            break;
        }
        console.log(tanks);
        if (bullets[key]["object"] && (bullets[key].need_draw == 0 || bulls_null == true))
            canvas.removeChild(bullets[key]["object"]);
        if (bullets[key].need_draw == 0 || bulls_null == true)
            delete bullets[key];
    }
}