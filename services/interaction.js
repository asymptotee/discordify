const { MessageEmbed } = require("discord.js")
const Albums = require("../Schemes/Albums")
const { set_step, get_step } = require("./user")

class InteractionHandler {
    constructor (interaction) {
        this.interaction = interaction
    }

    async add() { // Добавить трек в плейлист после выбора в Drop-down
        const payload = JSON.parse(this.interaction.values)
        await Albums.findOneAndUpdate(
            { owner: this.interaction.user.id, name: await get_step(this.interaction.user.id)}, 
            { $push: { songs: { song: payload[0], singer: payload[1] } } 
        })
        const embed = new MessageEmbed()
        .setColor('#32a852')
        .setTitle(payload[0])
        .setDescription(payload[1]);

        await this.interaction.reply({ content: 'Успешно добавлено!', ephemeral: true, embeds: [embed] });
    }
}

module.exports = InteractionHandler