const Albums = require("../Schemes/Albums")
const { set_step } = require("./user")

class GeneralMsgHandler {

    constructor(msg, commands) {
        this.msg = msg;
        this.commands = commands;
    };

    async show () { // Показать список плейлистов
        const albums = await Albums.find({ owner: this.msg.author.id }) // Вытягиваем из базы плейлист по ID
        this.msg.author.send(`Вот список твоих плейлистов:\n_${albums.map(x => x.name).join('\n')}_`) // Формируем и отправляем ответ
    }

    async explore () { // Показать содержимое плейлиста
        const name = this.commands
        const album = await Albums.findOne({ owner: this.msg.author.id, name: name }) // Ищем один плейлист, по полям: владелец, название
        if (album) {
            this.msg.author.send(`Содержимое плейлиста **${name}**:\n${album.songs.map(x => `${album.songs.indexOf(x)}.  ${x.singer} - ${x.song}`).join('\n')}`) // Формирование и отправка ответа
        }
    }

    help() {
        this.msg.author.send(`Список команд:
    1.**!list** - список плейлистов
    2.**!show [param]** - показать треки плейлиста
    3.**!create [param]**
    4.**!delete** - удалить плейлист
    5.**!edit** - перейти в режим редактирования плейлиста`)
    }

    async create () { // Создание плейлиста
        const name = this.commands
        if (name) { // Если имя плейлиста передано, то создаем его и завершаем работу функции
            return await Albums.create({ owner: this.msg.author.id, name: name, songs: [] }).then(() => {
                this.msg.author.send(`🎉 Успешно создан плейлист с названием **${name}**`)
            })
        }
        msg.author.send("Не может быть плейлиста с пустым именем!")
    }

    async delete () { // Удаление плейлиста
        const name = this.commands
        const { deletedCount } = await Albums.deleteOne({ owner: this.msg.author.id, name: name }) // Удаляем плейлист
        if (deletedCount != 0) { // Если плейлист был найден и удален - пишем положительный вариант
            this.msg.author.send(`Успешно удален альбом с названием **${name}**`)
        } else {
            this.msg.author.send(`Альбома с именем **${name}** не существует`)
        }
    }

    async edit () { // Переход в режим редактирования альбома
        const name = this.commands
        const album = await Albums.findOne({ owner: this.msg.author.id, name: name })
        if (album) {
            await set_step(this.msg, name)
        } else {
            return this.msg.author.send(`Альбома с именем **${name}** не существует`)
        }
        this.msg.author.send(`Вы перешли в режим редактирование альбома **${name}**!`)
    }
}

module.exports = GeneralMsgHandler