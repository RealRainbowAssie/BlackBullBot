const Discord = require("discord.js");

const TOKEN = process.env.BOT_TOKEN
const PREFIX = "!"

function generateHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

var fortunes = [
    "Ja",
    "Nee",
    "Misschien",
    "Fuck off!",
    "9/10 x wel!"
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
        case "embed":
            var embed = new Discord.RichEmbed()
                .addField("Twitch", "https://twitch.tv/realrainbowassie", true)
                .addField("Commands", "`!info` , `!8ball` , `!ping` ")
                .setColor(0xf1be4)
                .setFooter("Binnenkort meer informatie hier over!") 
                .setThumbnail(message.author.avatarURL)  
            message.channel.sendEmbed(embed);
            break;
        
            
    }

    }

    
    )

bot.login(TOKEN).catch(console.log);
