const Discord = require('discord.js');
const emoji = require('../../util/emoji.json');
const db = require('quick.db')

module.exports = {
    name: 'logs',
    description: 'mostrar os logs de moderação',
    usage: "k!logs",
    categorie: 'moderação',
run: async(bot, message, args) => {
    //if(message.author.id != message.guild.ownerId) return message.reply(`${message.author} apanas o dono do servidor pode usar esse comando`).then(msg => setTimeout(() => msg.delete(), 15000))

    let m_deletes = db.get(`m_delete_${message.guild.id}`)
    let m_update = db.get(`m_update_${message.guild.id}`)

    if(m_deletes === null){ m_deletes = '<:desligado:851955244836454410>' } else { m_deletes = `<:ligado:851956031432032276>` }
    if(m_update === null){ m_update = '<:desligado:851955244836454410>' } else { m_update = `<:ligado:851956031432032276>` }

let row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
        .setCustomId("m-delete")
        .setLabel('mensagem-deletada')
        .setStyle('DANGER')
        .setDisabled(false),
        new Discord.MessageButton()
            .setCustomId('m-update')
            .setLabel('mensagem-atualizada')
            .setStyle('SUCCESS')
            .setDisabled(true)
    )

 let painel_1 = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(
            `> Olá me chamo ${bot.user.username} fui criada para ajudar na segurança, diversão e moderação do seu servidor.\n\n` +
            `${m_deletes} mensagem Deletada\n` +
            `${m_update} mensagem Atualizada\n\n` +
            `> __**Entre no meu servidor de suporte**__ ([clica aqui](https://discord.gg/7wTFC59KDm))`
        )
        .setThumbnail(message.guild.iconURL({ dynamic: true}))
        .setFooter(`ID: ${message.guild.id}`, message.guild.iconURL({ dynamic: true }))
    const m = await message.channel.send({ embeds: [painel_1], components: [row], fetchReply: true })

    const iFilter = i => i.user.id === message.author.id;
        
        const collector = m.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });
    
            collector.on('collect', async(i) => {
                i.deferUpdate()
                switch (i.customId) {
                    case `m-delete`:
                
                    message.channel.send('mensione um canal de texto').then(msg => setTimeout(() => msg.delete(), 5000))

                const del = new Discord.MessageCollector(message.channel, { time: 100000})
                    
                    del.on('collect', async (msg) => {
                        const chat_delete = msg.mentions.channels.first()
                            db.set(`m_delete_${message.guild.id}`, chat_delete.id)
                    })
                

                let m_deletes1 = db.get(`m_delete_${message.guild.id}`)
                    if(m_deletes1 === null){ m_deletes1 = '<:desligado:851955244836454410>' } else { m_deletes1 = `<:ligado:851956031432032276>` }

                    m.edit({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                                .setDescription(
                                        `> Olá me chamo ${bot.user.username} fui criada para ajudar na segurança, diversão e moderação do seu servidor.\n\n` +
                                        `${m_deletes1} mensagem Deletada\n` +
                                        `${m_update} mensagem Atualizada\n\n` +
                                        `> __**Entre no meu servidor de suporte**__ ([clica aqui](https://discord.gg/7wTFC59KDm))`
                                                )
                                .setThumbnail(message.guild.iconURL({ dynamic: true}))
                                .setFooter(`ID: ${message.guild.id}`, message.guild.iconURL({ dynamic: true }))
                        ]
                    })
                msg.stop('sucess')

                }
            })
}
}