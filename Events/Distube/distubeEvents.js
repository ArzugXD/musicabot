const client = require("../../index.js");
const { EmbedBuilder } = require("discord.js");

const status = queue =>
    `Volumen: \`${queue.volume}%\` | Flitro: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [new EmbedBuilder().setColor("Green")
                .setDescription(`🎶 | Reproduciendo **\`${song.name}\`** - **\`${song.formattedDuration}\`**\ Pedida por: ${song.user
                    }\n${status(queue)}`)]
        })
    )
    .on('addSong', (queue, song) =>
        queue.textChannel.send(
            {
                embeds: [new EmbedBuilder().setColor("Green")
                    .setDescription(`🎶 | se añadio ${song.name} - \`${song.formattedDuration}\` a la cola por: ${song.user}`)]
            }
        )
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel.send(
            {
                embeds: [new EmbedBuilder().setColor("Green").setThumbnail(song.thumbnail)
                    .setDescription(`🎶 | se añadio \`${playlist.name}\` como playlist (${playlist.songs.length
                        } songs) a la cola\n${status(queue)}`)]
            }
        )
    )
    .on('error', (channel, e) => {
        if (channel) channel.send(`⛔ | a ocurrido un error: ${e.toString().slice(0, 1974)}`)
        else console.error(e)
    })

    .on('empty', channel => channel.send({
        embeds: [new EmbedBuilder().setColor("Red")
            .setDescription('⛔ |El canal de voz esta vacio! Saliendo del canal...')]
    }))
    .on('searchNoResult', (message, query) =>
        message.channel.send(
            {
                embeds: [new EmbedBuilder().setColor("Red")
                    .setDescription('`⛔ | No se encontro resultado para  \`${query}\`!`')]
            })
    )
    .on('finish', queue => queue.textChannel.send({
        embeds: [new EmbedBuilder().setColor("Green")
            .setDescription('🏁 | Cola acabada!')]
    }))