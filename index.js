const Discord = require("discord.js");
const TOKEN = "MzkzNjIzMTA3NTA5ODEzMjQ4.DR4sLg.MppfpRUzQlP03F0OuwD1NdH3OUY";
const WorldState = require('warframe-worldstate-parser');
const worldstateData = require('warframe-worldstate-data');

var statusAnterior = false;

var enemy = worldstateData.persistentEnemy;

var bot = new Discord.Client();

bot.on("ready", function(){
    console.log("ready");

    setInterval(function(){
        console.log("Entrou");
    var request = require('request');
request.get('http://content.warframe.com/dynamic/worldState.php', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var csv = body;
        console.log("Pegou estado");
        var ws = new WorldState(csv);
        console.log(ws.persistentEnemies[0].isDiscovered);
        var status = ws.persistentEnemies[0].isDiscovered;
            if(status != statusAnterior){
                console.log("Diferente");            
                var channel = bot.channels.get('393626375829061642');
                channel.sendMessage("<@&393660703484936192>\n"+ws.persistentEnemies[0].toString());
                statusAnterior = status;
            }else{

            }
        
    }
});
}, 30000);
    
});

bot.on("message", function(message){
    console.log(message.content);
});

bot.login(TOKEN);




