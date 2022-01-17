const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ] })
const { msg_controller, interaction_controller } = require('./controller')
const mongoose = require('mongoose')
const { create } = require("./services/user")
const { token, db_uri } = require("./config.json")
 

client.on('ready', async (bot) => {
    console.log(`Bot alive! ${bot.user.tag}`)
    await mongoose.connect(db_uri).then(() => {console.log("Connected to DB")}).then(() => {
        console.log("Success connected to db!")
    })
})

client.on('messageCreate', (msg) => {
    if (msg.author.bot) return
    msg.author.createDM().then(() => {
        msg_controller(msg, client)
    })
})

client.on('guildMemberAdd', member => {
    create(member.id)
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isSelectMenu()) {
        interaction_controller(interaction)
    }
})

client.login(token);