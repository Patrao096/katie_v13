const { MessageEmbed, MessageButton, MessageActionRow, MessageCollector } = require('discord.js');
const { prefix } = require('../../../config.json');
const emoji = require('../../util/emoji.json')
    
    
    module.exports = {
        name: "help",
        aliases: ['ajuda', 'commands', 'comandos'],
        description: 'Lista de comandos',
    run: async(bot, message, args) => {
        setTimeout(() => message.delete(), 0)
    
      let p = `${prefix}`  
    
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle("LINK")
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=767808374690938891&permissions=8&scope=bot") // por o convite do seu bot
                    .setLabel("Me Adicione")
                    .setEmoji(`${emoji.numero_zero_vermelhor}`) // por um emoji do seu gosto
                    .setDisabled(false),
                new MessageButton()
                    .setCustomId("categoria_utilidades")
                    .setStyle("SECONDARY")
                    .setLabel("Utilidades")
                    .setEmoji(`${emoji.numero_um_vermelho}`) // por um emoji do seu gosto
                    .setDisabled(false),
                new MessageButton()
                    .setCustomId("categoria_moderação")
                    .setStyle("SECONDARY")
                    .setLabel("Moderação")
                    .setEmoji(`${emoji.numero_dois_vermelho}`) // por um emoji do seu gosto
                    .setDisabled(false),
                new MessageButton()
                    .setCustomId("fechar")
                    .setStyle("DANGER")
                    .setLabel("Fechar Painel")
                    .setEmoji(`${emoji.numero_tres_vermelho}`) // por um emoji do seu gosto
                    .setDisabled(false)
                )
    
        const Painel = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle(`Painel de comandos | ${bot.user.username}`)
            .setDescription(
                            `> Olá me chamo ${bot.user.username} fui criada para ajudar na segurança, diversão e moderação do seu servidor.\n` +
                            `**Lista De Comandos a Baixo:** \n\n` +
                            ` Ultilidades\n` +
                            ` Moderação\n\n` +
                            `> __**Entre no meu servidor de suporte**__ ([clica aqui](Discord.gg/7wTFC59KDm))`
                           )
            .setColor(`#000001`)
            .setThumbnail(message.guild.iconURL())
            .setFooter(`ID ${message.guild.id}`, message.guild.iconURL())
        const m = await message.channel.send({ embeds: [Painel], components: [row], fetchReply: true })
    
        const iFilter = i => i.user.id === message.author.id;
        
        const collector = m.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });
    
            collector.on('collect', async(i) => {
                i.deferUpdate()
                switch (i.customId) {
                    case `categoria_utilidades`:
                        m.edit({
                            embeds: [
                                
                                new MessageEmbed()
                                    .setAuthor(message.guild.name, message.guild.iconURL())
                                    .setTitle(` Utilidades | ${bot.user.username}`)
                                    .setDescription(
                                                    `> Olá Aqui esta meus comandos da categoria Utilidades ${message.author.username} fique a vontade para olha!\n` +
                                                    `**Lista De Comandos a Baixo:**\n\n` +
                                                    `${p}Avatar\n` +
                                                    `${p}Help\n\n` +
                                                    `__(**Obs:** Digite ${p}!ajuda nome do comando para ver a discrição do comando)__`
                                                    )
                                    .setColor(`#000001`)
                                    .setThumbnail(message.guild.iconURL())
                                    .setTimestamp()
                                    .setFooter(`ID: ${message.guild.id}`, message.guild.iconURL())
                            ]
                        })
                      break;
                    case `categoria_moderação`:
                        m.edit({
                            embeds: [
                                new MessageEmbed()
                                    .setAuthor(message.guild.name, message.guild.iconURL())
                                    .setTitle(` Moderção | ${bot.user.username}`)
                                    .setDescription(
                                                    `> Olá Aqui esta meus comandos da categoria de moderação ${message.author.username} fique a vontade para olha!\n` + 
                                                    `**Lista De Comandos a Baixo:**\n\n` + 
                                                    `` + //por comandos aqui
                                                    `` +
                                                    `__(**Obs:** Digite ${p}!ajuda nome do comando para ver a discrição do comando)__`
                                                   )
                                    .setColor(`#000001`)
                                    .setThumbnail(message.guild.iconURL())
                                    .setTimestamp()
                                    .setFooter(`ID: ${message.guild.id}`, message.guild.iconURL())
                            ]
                        })
                      break;
                    case `fechar`:
                       setTimeout(() => m.delete(), 100)
                    
                }
            })
    
        }
}
    