const { set_step } = require("./user")
const axios = require("axios")
const {api_key} = require("../config.json")
const { MessageActionRow, MessageSelectMenu } = require("discord.js")

exports.save = async (msg) => {
    await set_step(msg, "default")
    console.log("sss")
    msg.author.send("Вы в главном меню!")
}

exports.search = async (msg, name) => {
    let tracks = await axios.get('https://shazam.p.rapidapi.com/search', {
        params: {term: name, locale: 'ru-US', offset: '0', limit: '5'},
        headers: {
          'x-rapidapi-host': 'shazam.p.rapidapi.com',
          'x-rapidapi-key': api_key
        }
    }).then(data => {
        return data.data.tracks.hits.map((x) => {
            return { label: x.track.title, description: x.track.subtitle, value: `**${x.track.title}** - _${x.track.subtitle}_` }
        })
    })

    // console.log(tracks)
    const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .addOptions(tracks),
        );

        await msg.author.send({ content: 'Выберите из списка', components: [row] });
}