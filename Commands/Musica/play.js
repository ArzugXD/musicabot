const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji} = require('discord.js');
const client = require('../../index');
const distube = require('distube')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('reproduce una cancion')
    .addStringOption(option =>
        option.setName('cancion')
            .setDescription('URL o nombre de la cancion')
            .setRequired(true)
        ),
        async execute(interaction) {
            const {member, guild, options, channel} = interaction;

            const query = options.getString('cancion')
            const voiceChannel = member.voice.channel;

            const embed = new EmbedBuilder();
            
            if(!voiceChannel) {
                embed.setColor('Red').setDescription('Debes poner musica para poder usar este comando! ❌')
                return interaction.reply({embeds: [embed], ephemeral: true})
            }

            if(!member.voice.channel == guild.members.me.voice.channelId) {
                embed.setColor('Red').setDescription(`No puedes poner musica si ya esta activo en <#${guild.members.me.voice.channelId}> ❌`)
                return interaction.reply({embeds: [embed], ephemeral: true})
            }

            try {
                client.distube.play(voiceChannel, query, { textChannel: channel, member: member })
                    return interaction.reply({content: "🎶 cancion recibida"})
            } catch(err) {
                console.log(err);

                embed.setColor("Red").setDescription(`⛔ | Algo a ido mal...`)

                return interaction.reply({ embeds: [embed], ephemeral: false})
            }
        }
}