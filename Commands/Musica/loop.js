const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const client = require('../../index');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('muestra las opciones de loop')
        .addStringOption(option => 
            option.setName('opciones')
            .setDescription('Opciones de Loop: desactivado, cancion, cola')
                .addChoices(
                    {name: "desactivado", value: "desactivado"},
                    {name: "cancion", value: "cancion"},
                    {name: "cola", value: "cola"},
                )
                .setRequired(true)
            ),
            async execute(interaction) {
                const {member, options, guild} = interaction;
                const option = options.getString("opciones")
                const voiceChannel = member.voice.channel

                const embed = new EmbedBuilder()

                if(!voiceChannel) {
                    embed.setColor('Red').setDescription('Debes unirte a un canal de voz usar esto ❌')
                    return interaction.reply({embeds: [embed], ephemeral: true})
                }
    
                if(!member.voice.channel == guild.members.me.voice.channelId) {
                    embed.setColor('Red').setDescription(`No puedes usar al KrasterMusic si ya esta activo en <#${guild.members.me.voice.channelId}> ❌`)
                    return interaction.reply({embeds: [embed], ephemeral: true})
                }

                try {
                    const queue = await client.distube.getQueue(voiceChannel);

                    if(!queue) {
                        embed.setColor("Red").setDescription('no hay cola activa');
                        return interaction.reply({ embeds: [embed]})
                    }

                    let mode = null;

                    switch (option) {
                        case "desactivado":
                            mode = 0;
                            break;
                        case "cancion":
                            mode = 1;
                            break;
                        case "cola":
                            mode = 2;
                            break;
                    }

                    mode = await queue.setRepeatMode(mode);

                    mode = mode ? (mode === 2? "Repetir cola" : "Repetir cancion") : "desactivado"

                    embed.setColor("Greyple").setDescription(`🔁 configurar el modo de repetición a \`${mode}\``);
                } catch(err) {
                    console.log(err);
    
                    embed.setColor("Red").setDescription(`⛔ | Algo a ido mal...`)
    
                    return interaction.reply({ embeds: [embed], ephemeral: false})
                }
            }
}