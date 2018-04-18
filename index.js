import { arch } from "os";

const Discord = require("discord.js");

const TOKEN = "NDM1ODM5MjUxMDM3NTUyNjcx.Dbe0lA.81mjftpjYlZvHgf8u5Z3Cyz-9Ew"; 
const PREFIX = "!"

function generateHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

var fortunes = [
    "Ja",
    "Nee",
    "Misschien",
    "Fuck off!",
    "9/10 x wel!",
];

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("ready");
});

bot.on("guildMemberAdd", function(member) {

    member.guild.channels.find("name", "nieuwe-nibbas").sendMessage(member.toString() + " Welkom op de server! Lees de regels even door als je wilt!");

    member.addRole(member.guild.roles.find("name", "Nibber"));

});

bot.on("message", function(message) {
    if (message.author .equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    if(cmd == `${prefix}kick`){
      
       let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       if(!kUser) return message.channel.send("Kan persoon niet vinden");
       let kReason = args.join(" ").slice(22);
       if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je hebt hier geen permissie voor!")
       if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Diegene kan niet gekicked worden!")


       let kickEmbed = new Discord.RichEmbed()
       .setDescription("~Kick~")
       .setColor("#E81F3F")
       .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
       .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
       .addField("Kicked In", message.channel)
       .addField("Tiime", message.createdAt)
       .addField("Reason", kReason);

       let kickChannel = Message.guild.channels.find(`name`, "warn-system");
       if(!kickChannel) return message.channel.send("Kan warn-system channel niet vinden.");

       message.guild.member(kUser).kick(kReason);
       kickChannel.send(kickEmbed)

        return;
    }



    switch (args[0].toLocaleLowerCase()) {
       case "ping":
            message.channel.sendMessage("Pong!");
            break;
        case "info":
            message.channel.sendMessage("Ik ben BlackBull, Waar mijn naam vandaan komt? Asmar was een keer RedBull aan het drinken, En had snel een naam nodig ENNN hij had gewoon zin om een bot te maken i think.");
            break;
        case "8ball":
        if (args [1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("Wat bedoel je?");
            break;
        default: message.channel.sendMessage("wat voor command wil je?");  
        case "sollicitatie":
             message.channel.sendMessage("Voor het sollicitatie formulier ga dan naar #staff-sollicitatie!")
             break;
        case "twitch":
            var embed = new Discord.RichEmbed()
                .addField("Twitch", "https://twitch.tv/realrainbowassie", true)
                .setColor(0xf1be4)
                .setFooter("Binnenkort meer informatie hier over!") 
                .setThumbnail(message.author.avatarURL)  
            message.channel.sendEmbed(embed);
            break;
    
        case "commands":
            var embed = new Discord.RichEmbed()
                .addField("Commands", "!ping , !info , !8ball , !twitch , !commands", true)
                .setColor(0xf1be4)
                .setFooter("Binnenkort meer informatie hier over!") 
                .setThumbnail(message.author.avatarURL)  
            message.channel.sendEmbed(embed);
            break;
    
            
    }

    }

    
    )

bot.login(TOKEN).catch(console.log);
