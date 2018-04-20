const Discord = require("discord.js");

const TOKEN = "NDM1ODM5MjUxMDM3NTUyNjcx.Dbe0lA.81mjftpjYlZvHgf8u5Z3Cyz-9Ew";
const PREFIX = "!"

function generateHex() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}




var fortunes = [
  ":white_check_mark:`Ja`",
  ":negative_squared_cross_mark:  `Nee`",
  ":fingers_crossed:  `Misschien`",
  ":negative_squared_cross_mark:  `Fuck off!`",
  ":white_check_mark: `9/10 x wel!`",
  ":white_check_mark: `ja best wel`",
  ":negative_squared_cross_mark:  `NEE TOTAAL NIET!`",
  ":negative_squared_cross_mark:  `ZWIJGRECHT A MATTIE!`",
  ":white_check_mark: `stiekem wel ja`",
  ":white_check_mark: **100%**",
];

var bot = new Discord.Client();

var servers = {};

bot.on("ready", () => {
  console.log("Bot Launched...")

  bot.user.setStatus("Online")
  bot.user.setGame("MAINTENCE")
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

bot.on("message", message => {
  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith(PREFIX)) return;

  var args = message.content.substring(PREFIX.length).split(" ");



  switch (args[0].toLocaleLowerCase()) {
    case "ping":
      message.channel.sendMessage("Pong!");
      break;
    case "info":
      message.channel.sendMessage(":construction_worker: - **BlackBullBot**");
      break;
   
    case "8ball":
      if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
      else message.channel.sendMessage("Wat bedoel je?");
      break;
    default:
      message.channel.sendMessage("wat voor command wil je?");
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
    case "kick":
      if (!message.member.roles.some(r => ["CEO", "COO", "FOUNDER", "H - ADMIN", "ADMIN"].includes(r.name))) return message.reply(":raised_hand: Sorry, je hebt geen permissie!");


      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if (!member)
        return message.reply("Geef een user van de server op!");
      if (!member.kickable)
        return message.reply(":raised_hand: Ik kan deze persoon niet kicken!");


      let reason = args.slice(1).join(' ');
      if (!reason) reason = "Geen reden";


      member.kick(reason)
        .catch(error => message.reply(`:negative_squared_cross_mark: Sorry ${message.author} is niet gekicked omdat : ${error}`));
      message.reply(`${member.user.tag} :white_check_mark:  Is gekicked door ${message.author.tag} omdat: ${reason}`);
      break;
      
    case "commands":
      var embed = new Discord.RichEmbed()
        .addField("Commands", "!ping , !info , !8ball , !twitch , !commands , !invite", true)
        .addField("Meer commands?", "Als jij wat mist in de bot geef het dan aan dan kijken wij voor mogelijk heden!", true)
        .setColor(0x42E8F3)
        .setTimestamp()
        .setFooter("BlackBullBot v.1.0.2!©")
        .setThumbnail(bot.user.displayAvatarURL)
        
      message.channel.sendEmbed(embed);
      break;

      case "socialmedia":
      var embed = new Discord.RichEmbed()
        .title("Social Media")
        .addField("Instagram", ":camera: https://instagram.com/asmardjowi", true)
        .setDescription("Volg me op insta voor wat mooie foto's van mijn gezicht!")
        .addField("Snapchat", "Mijn snapchat: :ghost: YungAssie", true)
        .setDescription("Wil jij nou mijn dagelijks leven zien? Dat kan jaja voeg me op snapchat!")
        .setColor(0x42E8F3)
        .setTimestamp()
        .setFooter("BlackBullBot v.1.0.2!©")
        .setThumbnail(bot.user.displayAvatarURL)
        
      message.channel.sendEmbed(embed);
      break;

    case "help":
      var embed = new Discord.RichEmbed()
        .addField("8ball", "Type !8ball <vraag> - De bot geeft antwoord op je vraag! ", true)
        .addField("Ping - Pong", "Type !ping en de bot reageerd - Pong!", true)
        .addField("Commands", "Type !commands en de bot geeft je wat commands wat we hebben")
        .addField("Info", "Type !info voor wat korte informatie over de bot!" )
        .addField("Kick", "Type !kick <user> <reden> - Hiermee kick je een bot (hiervoor heb je een speciale rol nodig!)")
        .setColor(0x42E8F3)
        .setTimestamp()
        .setFooter("BlackBullBot v.1.0.2!©")
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
      message.channel.sendEmbed(embed);
      break;
    case "invite":
      var embed = new Discord.RichEmbed()
        .addField("Invite link", "Laat andere mensen ook de server joinen! https://discord.io/blackbullbot", true)
        .addField("Open Bots", "Binnenkort hebben wij ook bot die iedereen kan gebruiken!", true)
        .setColor(0x42E8F3)
        .setTimestamp()
        .setFooter("BlackBullBot v.1.0.2!©")
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

    
      
  
  }
});


bot.login(TOKEN).catch(console.log);


