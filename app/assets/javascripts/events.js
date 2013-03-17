$("#connect").click(function(){
    connect();
});

$("#bot_connect").click(function(){
    bot_connection();
});


$("#disconnect").click(function(){
    disconnect();
});

function left() {
    ws_bot.send(JSON.stringify({turn_angle: -10}));
}

function move(){
    ws_bot.send(JSON.stringify({move: 1}));
}

function right() {
    ws_bot.send(JSON.stringify({turn_angle: 10}));
}

function down(){
    ws_bot.send(JSON.stringify({move: 0}));
}

function ctrl(){
    ws_bot.send(JSON.stringify({fire: true}));
}

$(window).keydown(function() {
    button = event.which;
    switch (button) {
        case 65: left(); break;
        case 83: down(); break;
        case 68: right(); break;
        case 87: move(); break;
        case 17: ctrl(); break;
    }
});