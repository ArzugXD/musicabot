const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji} = require('discord.js');
const client = require('../../index');
const distube = require('distube')
const queue = require('distube')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('volumen')
    .setDescription('modifica el volumen')
    .addIntegerOption(option => 
        option.setName('volumen')
        .setDescription("10 = 10%")
        .setMinValue(0)
        .setMaxValue(100)
        .setRequired(true)
        ),
        async execute(interaction) {
            const {options, member, guild, channel} = interaction;

            const volume = options.getInteger('volumen')
            const voiceChannel = member.voice.channel;

            const embed = new EmbedBuilder();
            
            if(!voiceChannel) {
                embed.setColor('Red').setDescription('Debes unirte a un canal de voz para usar esto ❌')
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

                client.distube.setVolume(voiceChannel, volume)
                        return interaction.reply({content: `🔊 el volumen se establecio en ${volume}%`})
            } catch(err) {
                console.log(err);

                embed.setColor("Red").setDescription(`⛔ | Algo a ido mal...`)

                return interaction.reply({ embeds: [embed], ephemeral: false})
            }
        }
}