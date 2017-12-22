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


                var embedp = {
                  "content": "<@&393660703484936192>",
                  "embed": {
                    "title": "O acolyte ".concat(status?"apareceu!":"desapareceu!"),
                    "description": "Ultima vez visto em: "+ ws.persistentEnemies[0].lastDiscoveredAt,
                    "color": 2327226,
                    "thumbnail": {
                      "url": "https://vignette.wikia.nocookie.net/warframe/images/e/ec/StrikerAcolyte.png"
                    },
                    "author": {
                      "name": bot.user.username,
                      "icon_url": bot.user.avatarURL
                    }
                  }
                }


                var embed = new Discord.RichEmbed()
                    .setTitle("O acolyte ".concat(status?"apareceu!":"desapareceu!"))
                    .setAuthor(bot.user.username, bot.user.avatarURL)

                    .setColor(0x00AE86)
                    .setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/e/ec/StrikerAcolyte.png")
                    .setDescription("Ultima vez visto em: "+ ws.persistentEnemies[0].lastDiscoveredAt)
                    .setTimestamp();




                channel.send("<@&393660703484936192>",embedp);
                
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




