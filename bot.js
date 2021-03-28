const Discord = require('discord.js');

const bot = new Discord.Client();

const { bot_token } = process.env

module.exports = async function (){
    bot.login(bot_token)
    bot.on('ready',() => {
        console.log("> I'm working");
    })
    
    async function clear(msg){
        if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply("Você não tem poder para isso!")
    
        const deleteCount = 99;
        const fetched = await msg.channel.messages.fetch({ limit: deleteCount + 1});
        msg.channel
            .bulkDelete(fetched)
            .catch(err => console.log({ err,situation:"Clear Function" }))
    } 
    
    bot.on("message",msg => {
        if(msg.content.toLowerCase() === "!clear"){
            clear(msg)
            console.log("> Messages cleaned")
        }
    })
}
