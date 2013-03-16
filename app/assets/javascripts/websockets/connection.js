var ws;
function connect(){
    ws = new WebSocket("ws://192.168.30.197:5555/");

    // и навешивает на новый объект три колл-бека:

    // первый вызовется, когда соединение будет установлено:
    ws.onopen = function() {
        alert("Connection opened...");
        //send("observer\n");
    };

    // второй - когда соединено закроется
    ws.onclose = function() {
        alert("Connection closed...")
    };

    // и, наконец, третий - каждый раз, когда браузер получает какие-то данные через веб-сокет
    ws.onmessage = function(evt) {
        console.log(evt.data);
        parse_response(evt.data);
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

                bot_height = server_json[key]["bot_height"];
                bot_width = server_json[key]["bot_width"];
            }

            if (key == "bot"){
                parse_bots(server_json[key]);
            }
        }
    }
}

function parse_bots(bots){

}