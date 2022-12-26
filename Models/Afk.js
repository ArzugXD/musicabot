const {model, Schema} = require('mongoose');

let afkSchema = new Schema({
    GuildId: String,
    UserId: String,
    Afk: Boolean
});

module.exports = model("AFK", afkSchema);