const Discord = require('discord.js')
const moment = require('moment')
const db = require('quick.db')
moment.locale('pt-BR')

module.exports = {
    name: 'messageDelete',
run: async(bot, message) => {

   let chx = db.get(`m_delete_${message.guild.id}`)

    let Delet = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
        .setTitle(`Manitoramento | ${bot.user.username}`)
        .setDescription(
            `> Olá me chamo ${bot.user.username} aqui fica meu painel de manitoramento de mensagens deletadas fique avontade para dar uma olhada\n\n` + 
            `Usuário: ${message.author.tag} - (ID: ${message.author.id})\n` + 
            `Canal: ${message.channel.name} - (ID: ${message.channel.id})\n` + 
            `Hora:  ${moment(Date.now()).format("L LT")}\n\n` + 
            `> **Mensagem Deletada:** __${message}__`
        )
        .setFooter(`ID: ${message.guild.id}`, message.guild.iconURL({ dynamic: true }))
    message.guild.cache.get(chx).send({ embeds: [ Delet ]})
    }
}