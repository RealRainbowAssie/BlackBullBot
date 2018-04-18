const botconfig = require("./botconfig,json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
    bot.user.setGame("Penetratie");

    try{
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    }catch(e){
        console.log(e.stacks);
    }


bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messages = message.content.split(" ");
    let cmd = messages[0];
    let args = messages.slice(1);

    if(cmd === `${prefix}yo`){

        return message.channel.send("Hallo daar!")
    }
  });


});


bot.login(botconfig.token);
