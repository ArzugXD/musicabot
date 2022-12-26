const {Client} = require('discord.js');
const mongoose = require('mongoose');
const config = require("../../config.json");
const Levels = require('discord.js-leveling');
const { ActivityType } = require('discord.js');

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        const activities = [
            { name: `La Cueva de Kraster`, type: ActivityType.Listening },
          ];
          const status = [
            'online',
          ];
          let i = 0;
      setInterval(() => {
        if(i >= activities.length) i = 0
        client.user.setActivity(activities[i])
        i++;
      }, 10000);
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        });

        if (mongoose.connect) {
            console.log('MongoDB conectado. ✅')
        }

        Levels.setURL(config.mongodb);

        console.log(`${client.user.username} ahora esta online. 🤖`);
    },
};