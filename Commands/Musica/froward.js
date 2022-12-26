const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji} = require('discord.js');
const client = require('../../index');
const distube = require('distube')
const queue = require('distube')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('adelantar')
    .setDescription('adelanta segundos una cancion')
    .addIntegerOption(option => 
        option.setName('tiempo')
        .setDescription('El tiempo que pasaras la cancion (10 = 10s)')
        .setMinValue(0)
        .setRequired(true)
        ),
        async execute(interaction) {
            const {options, member, guild, channel} = interaction;


            const seconds = options.getInteger('tiempo');
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

                await queue.seek(queue.currentTime + seconds);
                            embed.setColor("Blue").setDescription(`⏩ se adelantaron \`${seconds}s\``)
                            return interaction.reply({ embeds: [embed], ephemeral: false})
            } catch(err) {
                console.log(err);

                embed.setColor("Red").setDescription(`⛔ | Algo a ido mal...`)

                return interaction.reply({ embeds: [embed], ephemeral: false})
            }
        }
}