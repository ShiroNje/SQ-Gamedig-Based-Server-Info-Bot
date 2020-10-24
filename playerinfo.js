const Discord = require('discord.js')
var SourceQuery = require('sourcequery');
var encoding = require("encoding");
const ayarlar = require("../ayarlar.json")
 
var sq = new SourceQuery(1000); // 1000ms timeout
sq.open(ayarlar.ip, ayarlar.port);
let host = ayarlar.ip
let port = ayarlar.port
let baglanan = ""
exports.run = (client, message, params) => {
sq.getPlayers(function(err, players){
  var z = players
  var i
  var d = ""
  var desc = ""
  var desc2 = ""
  var desc3 = ""
  const errorembed = new Discord.RichEmbed()
    .setColor("#bd1e1e")
    .setAuthor("Sunucu Kapalı", client.user.avatarURL)
    .setTimestamp()
    .setDescription(`**» Host: **${ayarlar.ip}\n **» Port: **${ayarlar.port}`)
    .setFooter("© 2020 Lodge", client.user.avatarURL)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL);
  if(!z) return message.channel.send(errorembed)
  for (i = 0; i < z.length; i++) {
    var lenx = z[i]["online"]
    var minx = parseInt(lenx / 60)
    var hoursx = parseInt(minx / 60)
    lenx = parseInt(lenx - minx * 60)
    if (minx > 60) {
      minx = parseInt(minx - hoursx * 60)
    }
    if (z[i]["online"] == "") d += ``
    if (hoursx >= 1) {
    desc2 += `**${i + 1}.** ${hoursx}h, ${minx}m\n`;
    }
    else {
      desc2 += `**${i + 1}.** ${minx}m, ${lenx}s \n`;
    }
  }
  for (i = 0; i < z.length; i++) {
  if (z[i]['name'] == "")
  desc += (`**${i+1}.** `+` Baglaniyor. \n `+` `)
  else
  desc += (`**${i+1}.** `+` ${z[i]['name']} \n`)
  desc3 += (`**${i+1}.** `+` ${z[i]['score']} \n`)
  var undesc = encoding.convert(desc, "Latin_1");
  } try {
    message.channel.send(
    new Discord.RichEmbed()
    .setAuthor("Oyuncu Listesi", client.user.avatarURL)
    .addField('Oyuncular', undesc, true)
    .addField('Süre', desc2, true)
    .addField('Skor', desc3, true)
    .setFooter("© 2020 Lodge", client.user.avatarURL)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .setColor("#1db35e")
    )
	} catch (err) {
      message.channel.send(
    new Discord.RichEmbed()
    .setAuthor("Players", client.user.avatarURL)
    .addField('Players', "؜", true)
    .addField('Time', "؜", true)
    .addField('Score', "؜", true)
    .setFooter("© 2020 Lodge", client.user.avatarURL)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .setColor("#1db35e")
    )
}
});
  
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pinfo'],
  permLevel: 0
};

exports.help = {
  name: 'playerinfo',
  description: 'CSGO Sunucusu hakkinda bilgi verir.',
  usage: 'playerinfo'
};
