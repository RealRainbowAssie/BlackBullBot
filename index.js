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

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
    if(cmd === `${prefix}kick`){
  
      //!kick @daeshan askin for it
  
      let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!kUser) return message.channel.send("Can't find user!");
      let kReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
      if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
  
      let kickEmbed = new Discord.RichEmbed()
      .setDescription("~Kick~")
      .setColor("#e56b00")
      .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
      .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Kicked In", message.channel)
      .addField("Tiime", message.createdAt)
      .addField("Reason", kReason);
  
      let kickChannel = message.guild.channels.find(`name`, "incidents");
      if(!kickChannel) return message.channel.send("Can't find incidents channel.");
  
      message.guild.member(kUser).kick(kReason);
      kickChannel.send(kickEmbed);
  
      return;
    }
  
    if(cmd === `${prefix}ban`){
  
      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!bUser) return message.channel.send("Can't find user!");
      let bReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
      if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
  
      let banEmbed = new Discord.RichEmbed()
      .setDescription("~Ban~")
      .setColor("#bc0000")
      .addField("Banned User", `${bUser} with ID ${bUser.id}`)
      .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Banned In", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", bReason);
  
      let incidentchannel = message.guild.channels.find(`name`, "incidents");
      if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
  
      message.guild.member(bUser).ban(bReason);
      incidentchannel.send(banEmbed);
  
  
      return;
    }
  
  
    if(cmd === `${prefix}report`){
  
      //!report @ned this is the reason
  
      let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!rUser) return message.channel.send("Couldn't find user.");
      let rreason = args.join(" ").slice(22);
  
      let reportEmbed = new Discord.RichEmbed()
      .setDescription("Reports")
      .setColor("#15f153")
      .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
      .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
      .addField("Channel", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", rreason);
  
      let reportschannel = message.guild.channels.find(`name`, "reports");
      if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
  
  
      message.delete().catch(O_o=>{});
      reportschannel.send(reportEmbed);
  
      return;
    }
  
  
  
  
    if(cmd === `${prefix}serverinfo`){
  
      let sicon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
      .setDescription("Server Information")
      .setColor("#15f153")
      .setThumbnail(sicon)
      .addField("Server Name", message.guild.name)
      .addField("Created On", message.guild.createdAt)
      .addField("You Joined", message.member.joinedAt)
      .addField("Total Members", message.guild.memberCount);
  
      return message.channel.send(serverembed);
    }
  
  
  
    if(cmd === `${prefix}botinfo`){
  
      let bicon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
      .setDescription("Bot Information")
      .setColor("#15f153")
      .setThumbnail(bicon)
      .addField("Bot Name", bot.user.username)
      .addField("Created On", bot.user.createdAt);
  
      return message.channel.send(botembed);
    }
  
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

        
            

                   
    
            
    }

    }

    
    )

bot.login(TOKEN).catch(console.log);
