const dotenv = require('dotenv')
dotenv.config();

const express = require('express')
const app = express();

app.get('/',(req,res) => {
    console.log(Date.now() + " Received Ping");
    res.status(200).send('Working on Discord by @davidlpc1!');
})

app.listen(process.env.PORT || 3000)

const Discord = require('discord.js');

const bot = new Discord.Client();

const { bot_token } = process.env

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