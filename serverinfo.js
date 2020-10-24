const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var encoding = require("encoding");
const math = require("mathjs");
exports.run = (client, message, args) => {
  const Gamedig = require("gamedig");
  let host = ayarlar.ip;
  let port = ayarlar.port;

  Gamedig.query({
    type: "csgo",
    host: host,
    port: port
  })
    .then(state => {
      var p = state;
      var botcount = "";
      const errorembed = new Discord.RichEmbed()
        .setColor("#bd1e1e")
        .setAuthor("Sunucu Kapalı", client.user.avatarURL)
        .setTimestamp()
        .setDescription(
          `**» Host: **${ayarlar.ip}\n **» Port: **${ayarlar.port}`
        )
        .setFooter("© 2020 Lodge", client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(client.user.avatarURL);
      if (!p) return message.channel.send(errorembed);
      if (p.raw.numbots == "0") botcount += "";
      else botcount += `(${p.raw.numbots})`;
      var sismi = p.name;
      var sismi2 = encoding.convert(sismi, "Latin_1");
      let numplayers = math.subtract(p.raw.numplayers, p.raw.numbots);
      message.channel.send(
        new Discord.RichEmbed()
          .setTitle(`${sismi2}`)
          .setTimestamp()
          .setDescription(
            `**» Harita: **${p.map}\n**» Oyuncular: **${numplayers}${botcount}/${p.maxplayers}\n**» Hızlı Bağlan**: steam://connect/${host}:${port}`
          )
          .setColor("#1db35e")
          .setThumbnail(client.user.avatarURL)
          .setFooter("© 2020 Lodge", client.user.avatarURL)
      );
    })
    .catch(error => {
      console.log(error);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sinfo"],
  permLevel: 0
};

exports.help = {
  name: "serverinfo",
  description: "CSGO Sunucusu hakkinda bilgi verir.",
  usage: "serverinfo"
};

