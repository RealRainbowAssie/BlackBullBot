const Discord = require('discord.js');
const client = new Discord.Client();
const Enmap = require("enmap");
const EnmapLevel = require('enmap-level');
const table1 = new EnmapLevel({ name: 'database' });
const database = new Enmap({ provider: table1});
const os = require("os");
const prefix = "!";
let queue = {};
const yt = require("ytdl-core")
const ffmpegbinaries = require("ffmpeg-binaries");
const opusscript = require("opusscript");
const cheerio = require('cheerio');
const snekfetch = require('snekfetch');
const querystring = require('querystring');
const search = require('youtube-search');
const youtubeThumbnail = require('youtube-thumbnail');

client.on('ready', () => {
  console.log(`Ingelogd als ${client.user.tag}!`);
});

client.on('message', message => {
  var startping = Date.now()
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  if (message.author.bot) return;

  if (command === "ping") {
    var startdate = Date.now();
    message.channel.send(":ping_pong:").then(msg => {msg.edit(`:ping_pong: \`${Date.now() - startdate}\`ms. :blue_heart: \`${Math.round(Math.floor(client.ping))}\`ms`)});
  }

  if (command === "help") {
    let embed = new Discord.RichEmbed()
    .setTitle("Help")
    .setColor("#00ff00")
    .setDescription("Krijg hulp met de bot!")
    .addField("Main", `\`${prefix}ping\` - Krijg de ping van de bot en van de discordAPI\n\`${prefix}help\` - Krijg hulp met de bot\n\`${prefix}botstats\` - Bekijk de stats van de bot!`, true)
    .addField("Moderator", `\`${prefix}warn <user> <reden>\` - Warn iemand\n\`${prefix}kick <user> <reden>\` - Kick iemand \n\`${prefix}ban <user> <dagen berichten verwijderen> <reden\` - Ban een user!`, true)
    .addField("Say", `\`${prefix}say\` - Laat de bot iets zeggen!\n\`${prefix}broadcast\` - Broadcast iets!\n\`${prefix}embed <everyone mension? (true/false)>\` - Verstuur een custom embed!`, true)
    .addField("Music", `\`${prefix}play <zoekterm>\` - Speel een muziekje af!\n\`${prefix}np\` - Bekijk wat er nu speelt!\n\`${prefix}stop\` - Stop de speler (DJ-only)\n\`${prefix}skip\` - Skip het liedje (DJ+requester ONLY)\n\`${prefix}volume <volume>\` - Verander het volume (DJ ONLY)!\n\`${prefix}pause\` - Zet de speler op pauze!\n\`${prefix}resume\` - Laat de speler verder gaan!\n\`${prefix}queue\` - Bekijk de wachtrij!\n`, true)
    .addField("Custom commands", `\`${prefix}youtube\` - Krijg het YouTube kanaal\n\`${prefix}discord\` - Krijg de discord invite link!`, true)
    message.channel.send(embed);
  }

  if (command === "botstats") {
    message.channel.send("Ik ben bezig...").then(message => {
      var ping = Date.now() - startping;
      const usememory = Math.round(os.freemem() / 1000000)
      const totalmemory = Math.round(os.totalmem() / 1000000)
      const freememory = totalmemory - usememory
      const ditisdeosuptimeinuren = os.uptime / 3600
      const ditisdeosuptime = Math.round(ditisdeosuptimeinuren)
      const embed = new Discord.RichEmbed()
      .setTitle("BotStats")
      .setColor(0x00AE86)
      .addField("bot", `Uptime: ${Math.round((Math.floor(process.uptime())) / 3600)} uur\nNodeJS version: ${process.version}\nDiscord.JS version: ${Discord.version}`, true) .addField("Memory", `Gebruikt: ${usememory}MB \nTotaal: ${totalmemory}MB \nOver: ${freememory}MB`, true)
      .addField("Ping", `Verwerking: ${(Date.now() - startping) - ping}ms\nPing: ${ping}ms\nAPI: ${Math.round(client.ping)}ms`, true)
      .addField("VPS", `Type: ${os.type} (${os.platform})\nBuild number: ${os.release}\nUptime: ${ditisdeosuptime} uur`, true)
      message.edit(embed);
    })
  }

  if (command === "warn") {
      if (message.author.id === message.guild.ownerID || message.author.id === "327462385361092621" || message.member.roles.some(r => ["moderator"].includes(r.name))) {
        if (!args[0]) return message.channel.send("Je moet wel eerst een user mensionen!");
        if (!args[1]) return message.channel.send("Je moet wel een reden opgeven!");
        message.delete();
        try {
          message.guild.channels.find("name",`mod-log`)
        }
        catch(err) {
          return message.channel.send("Je moet wel een channel hebben met de naam `mod-log`!")
        }
        try {
          var id = message.mentions.users.first().id;
          var tag = message.mentions.users.first().tag;
          var username = message.mentions.users.first().username;
          var member = message.mentions.users.first()
          var warnMember = message.guild.member(message.mentions.users.first());
        }
        catch(err) {
          return message.channel.send("Je moet de user wel goed mensionen!");
        }
        try {
          var reason = args.splice(1).join(" ");
        }
        catch(err) {
          return message.channel.send("Er is iets mis gegaan met de reden!");
        }
        let embed = new Discord.RichEmbed().setTitle("Warn").setColor("#ffff00").setDescription(`Je bent gewarnt op UltraDesigns!\nDoor: ${message.author.tag}\nReden: ${reason}`);
        warnMember.send(embed)
        message.delete()
        let embet = new Discord.RichEmbed().setTitle("Warn").setColor("#0cff00").setDescription(`<@${message.author.id}> heeft succesvol iemand gewarnt!`);
        message.channel.send(embet)
        .then(message => {
            setTimeout(messagedelete, 5000)
            function messagedelete() {
                message.delete()
            }
        })
        let embedt = new Discord.RichEmbed().setTitle("Warn").setColor("#ffff00").setDescription(`Iemand is gewarnd!\nDoor: ${message.author.tag}\nPlayer: ${tag}\nReden: ${reason}`);
        message.guild.channels.find("name",`mod-log`).send(embedt)
    } else {
        message.channel.send("Je mag dit commando niet uitvoeren omdat je geen moderator bent!");
    }
  }

    if (command === "kick") {
      if (message.author.id === message.guild.ownerID || message.author.id === "327462385361092621" || message.member.roles.some(r => ["moderator"].includes(r.name))) {
          message.delete();
           if (!args[0]) return message.channel.send("Je moet wel een user mensionen!");
           if (!args[1]) return message.channel.send("Je moet wel een reden opgeven!");
           if (!message.guild.me.hasPermission("KICK_MEMBERS", false, true, true)) return message.channel.send("Ik heb geen permissions om mensen te kicken!");
          var id = message.mentions.users.first().id;
          var tag = message.mentions.users.first().tag;
          var member = message.mentions.users.first()
          var kickMember = message.guild.member(message.mentions.users.first());
          var reason = args.splice(1).join(" ")
          if (id === message.author.id) return message.channel.send(":face_palm: Je kunt jezelf niet kicken...")
          if (kickMember.kickable === false) return message.channel.send("Ik kan diegene niet kicken! Misschien is de role te hoog?")
          let embet = new Discord.RichEmbed().setTitle("Warn").setColor("#0cff00").setDescription(`<@${message.author.id}> heeft succesvol iemand gekickt!`);
          message.channel.send(embet)
          .then(message => {
              setTimeout(messagedelete, 5000)
              function messagedelete() {
                  message.delete()
              }
          })
          message.guild.channels.find("name",`mod-log`).send({embed: new Discord.RichEmbed().setColor("#ff7700").addField("Iemand is gekickt!", `Gebruiker: ${tag}\nGedaan door: ${message.author.tag}\nReden: ${reason}`)});
          member.send({embed: new Discord.RichEmbed().setColor("#ff7700").addField("Je bent gekickt!", `Server: ${message.guild.name}\nGedaan door: ${message.author.tag}\nReden: ${reason}`)});

          kickMember.kick({
              reason: reason
          });
        } else {
          message.channel.send("Je moet een moderator zijn om dit te doen!")
        }
    }

    if (command === "ban") {
      if (message.author.id === message.guild.ownerID || message.author.id === "327462385361092621" || message.member.roles.some(r => ["moderator"].includes(r.name))) {
          message.delete();
          if (!args[0]) return message.channel.send("Je moet wel de user mensionen!");
          if (!args[1]) return message.channel.send("Je moet wel de aantal dagen opgeven van de verwijderde berichten!");
          if (Number(args[1]) > 7) return message.channel.send("Maximaal 7 dagen!");
          if (!args[2]) return message.channel.send("Je moet wel een reden opgeven!");
          if (!message.guild.me.hasPermission("BAN_MEMBERS", false, true, true)) return message.channel.send("Ik heb geen permissions om mensen te bannen!");
          var id = message.mentions.users.first().id;
          var tag = message.mentions.users.first().tag;
          var member = message.mentions.users.first()
          var banMember = message.guild.member(message.mentions.users.first());
          var days = args[1]
          var reason = args.splice(2).join(" ")
          if (id === message.author.id) return message.channel.send(":face_palm: Je kunt jezelf niet bannen...")
          if (banMember.bannable === false) return message.channel.send("Ik kan diegene niet bannen! Misschien is de role te hoog?")
          let embet = new Discord.RichEmbed().setTitle("Warn").setColor("#0cff00").setDescription(`<@${message.author.id}> heeft succesvol iemand verbannen!`);
          message.channel.send(embet)
          .then(message => {
              setTimeout(messagedelete, 5000)
              function messagedelete() {
                  message.delete()
              }
          })
          message.guild.channels.find("name",`mod-log`).send({embed: new Discord.RichEmbed().setColor("#ff0000").addField("Iemand is verbannen!", `Gebruiker: ${tag}\nGedaan door: ${message.author.tag}\nReden: ${reason}\nAantal dagen dat de berichten zijn verwijderd: ${days}`)});
          member.send({embed: new Discord.RichEmbed().addField("Je bent verbannen!", `Server: ${message.guild.name}\nGedaan door: ${message.author.tag}\nReden: ${reason}\nAantal dagen dat de berichten zijn verwijderd: ${days}`)});

          banMember.ban({
              days: Number(days),
              reason: reason
          });
        }
    }

    if (command === "say") {
      if (!args[0]) return message.channel.send("Je moet wel zeggen dat de bot moet gaan zeggen!");
      if (message.member.roles.some(r => ["say"].includes(r.name))) {
          message.delete()
          let embed = new Discord.RichEmbed()
          .setTitle("Say")
          .setColor("#4bf442")
          .addField(`${message.author.tag} zegt:`, `${args.splice(0).join(" ")}`, true)
          message.channel.send({embed})
      } else {
          message.channel.send(`Je moet wel de role \`say\` hebben om dit command uit te voeren!`)
      }
    }

    if (command === "broadcast") {
      if (!args[0]) return message.channel.send("Je moet wel opgeven wat je wilt mededelen!")
      if (message.member.roles.some(r => ["say"].includes(r.name))) {
        message.delete()
        message.channel.send("@everyone")
        let embed = new Discord.RichEmbed()
        .setTitle("Broadcast")
        .setColor("#4bf442")
        .addField(`${message.author.tag} deelt iets mee:`, `${args.splice(0).join(" ")}`, true)
        message.channel.send({embed})
      } else {
        message.channel.send(`Je moet de role \`say\` hebben om iets mee te delen!`)
      }
    }

    if (command === "embed") {
      if (!args[0]) return message.channel.send("Je moet wel zeggen of er wel of geen everyone bij moet komen! Dit doe je met `true` voor wel met everyone en `false` voor geen everyone")
      if (args[0] === "true") {
          var everyone = true
      } else {
          var everyone = false
      }
      message.channel.send(`Welke kleur wil je? (https://goo.gl/1UNgr8) (je hebt de # nodig, dus bij zwart is het #000000)`)
      .then(function(){
          message.channel.awaitMessages(response => message.content, {
              max: 1,
              time: 300000000,
              errors: ['time'],
          })
          .then((collected) => {
              var color = collected.first().content
              message.channel.send(`Wat moet de title zijn?`)
              .then(function(){
                  message.channel.awaitMessages(response => message.content, {
                      max: 1,
                      time: 300000000,
                      errors: ['time'],
                  })
                  .then((collected) => {
                      var title = collected.first().content
                      message.channel.send(`Wat moet de description zijn?`)
                      .then(function(){
                          message.channel.awaitMessages(response => message.content, {
                              max: 1,
                              time: 300000000,
                              errors: ['time'],
                          })
                          .then((collected) => {
                              setTimeout(embedsender, 1000)
                              function embedsender() {
                                  var description = collected.first().content
                                  let embed = new Discord.RichEmbed()
                                  .setTitle(`${title}`)
                                  .setColor(`${color}`)
                                  .setDescription(`${description}`)
                                  if (everyone === true) message.channel.send("@everyone")
                                  message.channel.send({embed})
                              }
                          })
                          .catch(function(){
                          });
                      });
                  })
                  .catch(function(){
                  });
              });
          })
          .catch(function(){
          });
      });
    }

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

    if (command === "queue") {
      if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Er zijn geen liedjes in de queue! Voeg liedjes toe met \`${prefix}play <URL>\``);
      let tosend = [];
      queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. **${song.title}** aangevraagd door **${song.requester}**`);});
      message.channel.sendMessage(`De music queue van ${message.guild.name}: Nu zijn er \`${tosend.length}\` liedjes in de wachtrij! ${(tosend.length > 15 ? '[ALLEEN DE EERSTE 15 KAN JE ZIEN]' : '')}\n${tosend.slice(0,15).join('\n')}`);
    }
    if (command === "discord") {
      message.channel.send("Kom zeker in mijn discord: https://discord.gg/XFkFKtk");
    }
});

client.login('NDM1ODM5MjUxMDM3NTUyNjcx.Dbe0lA.81mjftpjYlZvHgf8u5Z3Cyz-9Ew');
