const Discord = require("discord.js");
const TOKEN = process.env.TOKEN;
const WorldState = require('warframe-worldstate-parser');
const worldstateData = require('warframe-worldstate-data');

var statusAnterior = false;

var enemy = worldstateData.persistentEnemy;

var bot = new Discord.Client();

bot.on("ready", function(){
    console.log("ready");
    
});

bot.on("message", function(message){
    console.log(message.content);
});

bot.login(TOKEN);


setInterval(function(){
    var request = require('request');
request.get('http://content.warframe.com/dynamic/worldState.php', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var csv = body;
        var ws = new WorldState(csv);
        if(ws.persistentEnemies[0].isDiscovered){
            var status = true;
            if(status != statusAnterior){
                console.log("Foi");
                bot.channels.get('393626375829061642').sendMessage("<@&393660703484936192>\n"+ws.persistentEnemies[0].toString());
                statusAnterior = status;
            }else{

            }
        }
    }
});
}, 30000);

