const Discord = require("discord.js");

const bot = new Discord.Client();

const { bot_token, news_api_key } = process.env;

const axios = require("axios");

module.exports = async function () {
  bot.login(bot_token);
  bot.on("ready", () => {
    console.log("> Bot is working");
  });

  const commands = {
    clear: async (msg) => {
      if (!msg.member.hasPermission("MANAGE_MESSAGES"))
        return msg.reply("Você não tem poder para isso!");

      const deleteCount = 99;
      const fetched = await msg.channel.messages.fetch({
        limit: deleteCount + 1,
      });
      msg.channel
        .bulkDelete(fetched)
        .catch((err) => console.log({ err, situation: "Clear Function" }));
      console.log("> Bot cleaned messages");
    },
    status: async (msg) => {
      // In the future,we will show real results of the bot status
      msg.reply("Tudo ok por aqui,obrigado por perguntar");
    },
    news: async (msg) => {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=BR&apiKey=${news_api_key}`
      );
      const { articles } = await response.data;

      const titles = articles.map((article) => article.title);
      const maximiumTitles = titles.slice(0,17);
      const content = maximiumTitles.join("\n  - ");

      msg.reply(content);
    },
    covid: async (msg) => {
      const response = await axios.get(
        "https://covid19-brazil-api.now.sh/api/report/v1/brazil"
      );
      const { data } = await response.data;
      const { cases,deaths,recovered } = data;

      msg.reply(`No Brasil há ${parseInt(cases)} casos,${parseInt(deaths)} mortos e ${parseInt(recovered)} recuperados de Covid-19`);
    },
  };

  bot.on("message", async (msg) => {
    try {
      const msgContent = msg.content.toLowerCase();
      if(msgContent.indexOf("dl.") <= -1) return;
      const command = msgContent.replace("dl.", "");
      const commandFn = commands[command];
      if (commandFn){
        console.log(`> Starting command ${commandFn.name}`)
        commandFn(msg);
      }
    } catch (err) {
      console.error({ ...err, date: new Date() });
      msg.reply(
        "Isso é um erro. Por favor,contate @davidlpc1 nas redes sociais"
      );
    }
  });
};
