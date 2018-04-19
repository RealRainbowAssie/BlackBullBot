const Discord = require("discord.js");

const TOKEN = "NDM1ODM5MjUxMDM3NTUyNjcx.Dbe0lA.81mjftpjYlZvHgf8u5Z3Cyz-9Ew"; 
const PREFIX = "!"

function generateHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

var fortunes = [
    "`Ja`",
    "`Nee`",
    "`Misschien`",
    "`Fuck off!`",
    "`9/10 x wel!`",
    "`ja best wel`",
    "`NEE TOTAAL NIET!`",
    "`ZWIJGRECHT A MATTIE!`",
    "`stiekem wel ja`",
    "**100%**",
];

var bot = new Discord.Client();

var servers = {};

bot.on("ready", function() {
    console.log("ready");
});


bot.on("ready", () => {
    console.log("Bot Launched...")
    
    bot.user.setStatus("Online")
    bot.user.setGame("BlackBull Test Server")
});

bot.on("guildMemberAdd", function(member) {

    member.guild.channels.find("name", "nieuwe-nibbas").sendMessage(member.toString() + " Welkom op de server! Lees de regels even door als je wilt!");

    member.addRole(member.guild.roles.find("name", "Nibber"));

    member.guild.createRole({
        name: member.user.username,
        color: generateHex(),
        permissions: []
    }).then(function(roles) {
        member.addRole(role);
    });

});

bot.on("message", function(message) {
    if (message.author .equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLocaleLowerCase()) {
       case "ping":
            message.channel.sendMessage("Pong!");
            break;
        case "info":
            message.channel.sendMessage("```Ik ben BlackBull, Waar mijn naam vandaan komt? Asmar was een keer RedBull aan het drinken, En had snel een naam nodig ENNN hij had gewoon zin om een bot te maken i think.```");
            break;
        case "8ball":
        if (args [1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("Wat bedoel je?");
            break;
        default: message.channel.sendMessage("wat voor command wil je?");
             break;  
        case "sollicitatie":
             message.channel.sendMessage("Voor het sollicitatie formulier ga dan naar #staff-sollicitatie!")
             break;
        case "twitch":
            var embed = new Discord.RichEmbed()
                .addField("Twitch", "https://twitch.tv/realrainbowassie", true)
                .addField("Support", "Een follow achterlaten zou ik heel erg waarderen")
                .setColor(0x42E8F3)
                .setFooter("BlackBullBot v.1.0.2!") 
                .setThumbnail(bot.user.displayAvatarURL)  
            message.channel.sendEmbed(embed);
            break;
    
        case "commands":
            var embed = new Discord.RichEmbed()
                .addField("Commands", "!ping , !info , !8ball , !twitch , !commands , !invite", true)
                .addField("Meer commands?", "Als jij wat mist in de bot geef het dan aan dan kijken wij voor mogelijk heden!", true)
                .setColor(0x42E8F3)
                .setFooter("BlackBullBot v.1.0.2!") 
                .setThumbnail(bot.user.displayAvatarURL)  
            message.channel.sendEmbed(embed);
            break;

            case "help":
            var embed = new Discord.RichEmbed()
                .addField("8ball", "Type !8ball <vraag> - De bot geeft antwoord op je vraag! ", true)
                .addField("Ping - Pong", "Type !ping en de bot reageerd - Pong!" , true)
                .addField("Commands", "Type !commands en de bot geeft je wat commands wat we hebben")
                .setColor(0x42E8F3)
                .setFooter("BlackBullBot v.1.0.2!") 
                .setThumbnail(bot.user.displayAvatarURL)  
            message.channel.sendEmbed(embed);
            break;
            case "invite":
            var embed = new Discord.RichEmbed()
                .addField("Invite link", "Laat andere mensen ook de server joinen! https://discord.io/blackbullbot", true)
                .addField("Open Bots", "Binnenkort hebben wij ook bot die iedereen kan gebruiken!" , true)
                .setColor(0x42E8F3)
                .setFooter("BlackBullBot v.1.0.2!")
                .setThumbnail(bot.user.displayAvatarURL)
            message.channel.sendEmbed(embed);
            break;

        case "vrole":
            message.channel.sendMessage("rol verwijderd");
            message.member.removeRole(message.guild.roles.find("name", "Nibber"));
            break;

        case "deleterole":
        message.member.guild.roles.find("name", "Nibber").delete();
        message.channel.sendMessage("Verwijderd!")
        break;

        if (command === "play") {
            if (!args[0]) {
              if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Je moet eerst muziek toevoegen met \`${prefix}play <Zoekterm>\``);
              var voiceChannel = message.member.voiceChannel;
              if (!voiceChannel) return message.channel.send("Je moet wel in een voicechannel zitten!");
              if (queue[message.guild.id].playing) return message.channel.sendMessage('Ik speel al muziek!');
              voiceChannel.join();
              let dispatcher;
              queue[message.guild.id].playing = true;
              (function play(song) {
                if (song === undefined) return message.channel.sendMessage('De wachtrij is leeg, dus ik stop met afspelen!').then(() => {
                  queue[message.guild.id].playing = false;
                  message.member.voiceChannel.leave();
                });
                message.channel.sendMessage(`Ik speel nu **${song.title}** voor **${song.requester}**`);
                dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : passe });
                let collector = message.channel.createCollector(m => m);
                collector.on('message', msg => {
                  var arg = msg.content.split(" ").slice(1);
                  if (msg.content.toLowerCase().startsWith(prefix + "np")) {
                    var plat = "youtube";
                    if (plat === "youtube") {
                      var opts = {
                        maxResults: 1,
                        key: 'AIzaSyDtotP2-t9UOsJ3m6hVRkahiZs8G5Zigl8'
                      };
                      search(`${song.title}`, opts, function(err, results) {
                        if (err) return console.log(err);
                        let embed = new Discord.RichEmbed().setTitle("Music").setColor("#00ff00").setDescription(`**Song:** \`${results[0].title}\`\n**Requester:** \`${song.requester}\`\n**URL:** ${results[0].link}\n**Description:** \`${results[0].description}\`\n**Channel:** \`${results[0].channelTitle}\`\n**Time playing:** \`${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}\``)
                        message.channel.send({embed})
                      })
                    } else {
                      let embed = new Discord.RichEmbed().setTitle("Music").setColor("#00ff00").setDescription(`\n**URL:** \`${song.url}\`\n**Time playing:** \`${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}\``)
                      message.channel.send({embed})
                    }
                  }
                  if (msg.content.toLowerCase().startsWith(prefix + "stop")) {
                    if (message.author.id === message.guild.ownerID || message.author.id === "327462385361092621" || message.member.roles.some(r => ["dj"].includes(r.name))) {
                      message.channel.send("Ik ben gestopt met spelen!");
                      voiceChannel.leave()
                    } else {
                      message.channel.send("Je moet een DJ zijn om dit te doen!");
                    }
                  }
                  if (msg.content.toLowerCase().startsWith(prefix + "skip")) {
                      if (message.author.id === message.guild.ownerID || message.author.id === "327462385361092621" || message.member.roles.some(r => ["dj"].includes(r.name)) || message.author.username === song.requester) {
                        message.channel.send("Ik heb het liedje geskipt!")
                        return dispatcher.end()
                      } else {
                        message.channel.send("Je moet DJ of de song requester zijn om dit te doen!");
                      }
                  }
                  if (msg.content.toLowerCase().startsWith(prefix + "volume")) {
                    if (message.author.id === message.guild.ownerID || message.author.id === "327462385361092621" || message.member.roles.some(r => ["dj"].includes(r.name))) {
                      if (!arg[0]) return message.channel.send("Je moet wel een volume opgeven!")
                      if (Number(arg[0]) > 200 || Number(arg[0]) < 0) return message.channel.send("Je moet wel een volume opgeven tussen `0` en `200`!")
                      var newvolume = Number(arg[0]) / 100
                      message.channel.send(`Het volume is veranderd naar ${newvolume}!`)
                      dispatcher.setVolume(newvolume)
                    } else {
                      message.channel.send("Je moet DJ zijn om dit te doen!")
                    }
                  }
                  if (msg.content.toLowerCase().startsWith(prefix + "pause")) {
                    message.channel.send("De player staat op pauze!")
                    dispatcher.pause()
                  }
                  if (msg.content.toLowerCase().startsWith(prefix + "rusume")) {
                    message.channel.send("De player gaat weer verder!")
                    dispatcher.resume()
                  }
                });
                dispatcher.on('end', () => {
                  collector.stop();
                  play(queue[message.guild.id].songs.shift());
                });
                dispatcher.on('error', (err) => {
                  return message.channel.sendMessage('Er ging iets fout: ' + err).then(() => {
                    collector.stop();
                    play(queue[message.guild.id].songs.shift());
                  });
                });
              })(queue[message.guild.id].songs.shift());
            } else {
              let url = message.content.split(' ')[1];
              if (url == '' || url === undefined) return message.channel.sendMessage(`Je moet wel een url opgeven!`);
              if (args[0].toLowerCase().startsWith("https://www.youtube.com/")) {
                yt.getInfo(url, (err, info) => {
                  if(err) return message.channel.sendMessage('Geen goede YouTube link: ' + err);
                  if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
                  queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username});
                  message.channel.sendMessage(`**${info.title}** is nu in de queue! Doe \`${prefix}play\` om het af te spelen als je dit nog niet hebt gedaan!`);
                });
              } else {
                message.channel.send("Ik ben aan het zoeken...")
                .then(msg => {
                  var opts = {
                    maxResults: 1,
                    key: 'AIzaSyDtotP2-t9UOsJ3m6hVRkahiZs8G5Zigl8'
                  };
      
                  search(`${args.splice(0).join(" ")}`, opts, function(err, results) {
                    if (err) return console.log(err);
                    msg.edit(`Gevonden: ${results[0].link}`)
                    var url = results[0].link
                    yt.getInfo(url, (err, info) => {
                      if (err) return message.channel.sendMessage('Geen goede YouTube link: ' + err);
                      if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
                      var plat = "youtube";
                      queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username, platform: plat});
                      if (queue[message.guild.id].playing) return message.channel.send(`**${info.title}** is nu in de queue toegevoegd!`)
                      if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Je moet eerst muziek toevoegen met \`${prefix}play <URL>\``);
                      var voiceChannel = message.member.voiceChannel;
                      if (!voiceChannel) return message.channel.send("Je moet wel in een voicechannel zitten!");
                      voiceChannel.join();
                      if (queue[message.guild.id].playing) return message.channel.sendMessage('Ik speel al muziek!');
                      let dispatcher;
                      queue[message.guild.id].playing = true;
                      (function play(song) {
                        if (song === undefined) return message.channel.sendMessage('De wachtrij is leeg, dus ik stop met afspelen!').then(() => {
                          queue[message.guild.id].playing = false;
                          message.member.voiceChannel.leave();
                        });
                        message.channel.sendMessage(`Ik speel nu **${song.title}** voor **${song.requester}**`);
                        dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : passe });
                        let collector = message.channel.createCollector(m => m);
                        collector.on('message', msg => {
                          var arg = msg.content.split(" ").slice(1);
                          if (msg.content.toLowerCase().startsWith(prefix + "np")) {
                            var plat = "youtube";
                            if (plat === "youtube") {
                              var opts = {
                                maxResults: 1,
                                key: 'AIzaSyDtotP2-t9UOsJ3m6hVRkahiZs8G5Zigl8'
                              };
                              search(`${song.title}`, opts, function(err, results) {
                                if (err) return console.log(err);
                                let embed = new Discord.RichEmbed().setTitle("Music").setColor("#00ff00").setDescription(`**Song:** \`${results[0].title}\`\n**Requester:** \`${song.requester}\`\n**URL:** ${results[0].link}\n**Description:** \`${results[0].description}\`\n**Channel:** \`${results[0].channelTitle}\`\n**Time playing:** \`${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}\``)
                                message.channel.send({embed})
                              })
                            } else {
                              let embed = new Discord.RichEmbed().setTitle("Music").setColor("#00ff00").setDescription(`\n**URL:** \`${song.url}\`\n**Time playing:** \`${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}\``)
                              message.channel.send({embed})
                            }
                          }
                          if (msg.content.toLowerCase().startsWith(prefix + "stop")) {
                            if (message.author.id === message.guild.ownerID || message.author.id === "327462385361092621" || message.member.roles.some(r => ["dj"].includes(r.name))) {
                              message.channel.send("Ik ben gestopt met spelen!");
                              voiceChannel.leave()
                            } else {
                              message.channel.send("Je moet een DJ zijn om dit te doen!");
                            }
                          }
                          if (msg.content.toLowerCase().startsWith(prefix + "skip")) {
                              if (message.author.id === message.guild.ownerID || message.author.id === "327462385361092621" || message.member.roles.some(r => ["dj"].includes(r.name)) || message.author.username === song.requester) {
                                message.channel.send("Ik heb het liedje geskipt!")
                                return dispatcher.end()
                              } else {
                                message.channel.send("Je moet DJ of de song requester zijn om dit te doen!");
                              }
                          }
                          if (msg.content.toLowerCase().startsWith(prefix + "volume")) {
                            if (message.author.id === message.guild.ownerID || message.author.id === "327462385361092621" || message.member.roles.some(r => ["dj"].includes(r.name))) {
                              if (!arg[0]) return message.channel.send("Je moet wel een volume opgeven!")
                              if (Number(arg[0]) > 200 || Number(arg[0]) < 0) return message.channel.send("Je moet wel een volume opgeven tussen `0` en `200`!")
                              var newvolume = Number(arg[0]) / 100
                              message.channel.send(`Het volume is veranderd naar ${newvolume}!`)
                              dispatcher.setVolume(newvolume)
                            } else {
                              message.channel.send("Je moet DJ zijn om dit te doen!")
                            }
                          }
                          if (msg.content.toLowerCase().startsWith(prefix + "pause")) {
                            message.channel.send("De player staat op pauze!")
                            dispatcher.pause()
                          }
                          if (msg.content.toLowerCase().startsWith(prefix + "rusume")) {
                            message.channel.send("De player gaat weer verder!")
                            dispatcher.resume()
                          }
                        });
                        dispatcher.on('end', () => {
                          collector.stop();
                          play(queue[message.guild.id].songs.shift());
                        });
                        dispatcher.on('error', (err) => {
                          return message.channel.sendMessage('Er ging iets fout: ' + err).then(() => {
                            collector.stop();
                            play(queue[message.guild.id].songs.shift());
                          });
                        });
                      })(queue[message.guild.id].songs.shift());
                    });
                  });
                })
              }
            }
          }

        
            

                   
    
            
    }

    }

    
    )

bot.login(TOKEN).catch(console.log);
