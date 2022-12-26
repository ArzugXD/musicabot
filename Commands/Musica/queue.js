const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji} = require('discord.js');
const client = require('../../index');
const distube = require('distube')
const queue = require('distube')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cola')
    .setDescription('mira la cola del servidor'),
        async execute(interaction) {
            const {options, member, guild, channel} = interaction;


            const query = options.getString('cancion');
            const voiceChannel = member.voice.channel;

            const embed = new EmbedBuilder();
            
            if(!voiceChannel) {
                embed.setColor('Red').setDescription('Debes unirte a un canal de voz para poner musica ❌')
                return interaction.reply({embeds: [embed], ephemeral: true})
            }

            if(!member.voice.channel == guild.members.me.voice.channelId) {
                embed.setColor('Red').setDescription(`No puedes poner musica si ya esta activo en <#${guild.members.me.voice.channelId}> ❌`)
                return interaction.reply({embeds: [embed], ephemeral: true})
            }

            try {

                if(!queue) {
                    embed.setColor('Red').setDescription('No hay ninguna cola activa');
                    return interaction.reply({ embeds: [embed], ephemeral: true})
                }

                await client.distube.getQueue(voiceChannel);
                                    embed.setColor("Yellow").setDescription(`${queue.songs.map(
                                        (song, id) => `\n**${id + 1}** ${song.name} -\`${song.formattedDuration}\``
                                    )}`)
            } catch(err) {
                console.log(err);

                embed.setColor("Red").setDescription(`⛔ | Algo a ido mal...`)

                return interaction.reply({ embeds: [embed], ephemeral: false})
            }
        }
}