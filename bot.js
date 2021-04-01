const Discord = require('discord.js');

const bot = new Discord.Client();

const { bot_token,news_api_key } = process.env

const axios = require('axios')

module.exports = async function (){
    bot.login(bot_token)
    bot.on('ready',() => {
        console.log("> Bot is working");
    })
    
    const commands = {
        clear:async (msg) => {
            if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply("Você não tem poder para isso!")
    
            const deleteCount = 99;
            const fetched = await msg.channel.messages.fetch({ limit: deleteCount + 1});
            msg.channel
                .bulkDelete(fetched)
                .catch(err => console.log({ err,situation:"Clear Function" }))
                console.log("> Bot cleaned messages")
        },
        status:async (msg) => {
            // In the future,we will show real results of the bot status
            msg.reply("Tudo ok por aqui,obrigado por perguntar")
        },
        news:async (msg) => {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=BR&apiKey=${news_api_key}`)
            const { articles } = await response.data

            const titles = articles.map(article => article.title)
            const content = titles.join("\n  - ")

            msg.reply(content)
        }
    }

    
    bot.on("message",async msg => {
        const msgContent = msg.content.toLowerCase();
        const command = msgContent.replace('dl.','');
        const commandFn = commands[command];
        if(commandFn) commandFn(msg);

    })
}
