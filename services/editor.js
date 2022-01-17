const { set_step, get_step } = require("./user")
const { MessageActionRow, MessageSelectMenu } = require("discord.js")
const axios = require("axios")
const {api_key} = require("../config.json")
const Albums = require("../Schemes/Albums")

class EditorMsgHandler {

    constructor(msg, commands) {
        this.msg = msg;
        this.commands = commands;
    };

    async save () {
        await set_step(this.msg, "default")
        this.msg.author.send("Вы в главном меню!")
    }

    async shuffle() {
        const condition = { owner: this.msg.author.id, name: await get_step(this.msg.author.id) }
        const album =  await Albums.findOne(condition)
        album.songs.sort(() => Math.random() - 0.5)
        await Albums.findOneAndUpdate(condition, { $set: { songs: album.songs } })
        this.msg.author.send(`Содержимое плейлиста **${condition.name}**:\n${album.songs.map(x => `${x.singer} - ${x.song}`).join('\n')}`) 
    }

    async help() {
        this.msg.author.send(`Список команд:
        1. **!add** - добавить трек в плейлист
        2. **!shuffle** - перемешать плейлист
        3. **!remove** - удалить трек из плейлиста
        4. **!save** - выйти из режима редактирования`)
    }

    async remove () {
        const condition = { owner: this.msg.author.id, name: await get_step(this.msg.author.id) }
        const album = await Albums.findOne(condition)
        await Albums.findOneAndUpdate({ condition }, { $pull: { songs: album.songs[this.commands] } })
    }

    async search() {
        let tracks = await axios.get('https://shazam.p.rapidapi.com/search', {
            params: {term: this.commands, locale: 'ru-US', offset: '0', limit: '5'},
            headers: {
            'x-rapidapi-host': 'shazam.p.rapidapi.com',
            'x-rapidapi-key': api_key
            }
        }).then(data => {
            return data.data.tracks.hits.map((x) => {
                return { label: x.track.title, description: x.track.subtitle, value: `["${x.track.title}", "${x.track.subtitle}"]` } // `**${x.track.title}** - _${x.track.subtitle}_`
            })
        })

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Тут!')
                .addOptions(tracks),
            );

        await this.msg.author.send({ content: 'Выберите из списка', components: [row] });
    }
}

module.exports = EditorMsgHandler