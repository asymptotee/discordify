const Albums = require("../Schemes/Albums")
const Users = require("../Schemes/User")
const { set_step } = require("./user")

exports.show = async (msg) => {
    const albums = await Albums.find({ owner: msg.author }) // Вытягиваем из базы плейлист по ID
    msg.author.send(`Вот список твоих плейлистов:\n_${albums.map(x => x.name).join('\n')}_`) // Формируем и отправляем ответ
}

exports.explore = async (msg, name) => {
    const album = await Albums.findOne({ owner: msg.author, name: name }) // Ищем один плейлист, по полям: владелец, название
    msg.author.send(`Содержимое плейлиста **${name}**:\n${album.songs.map(x => x.singer + " - " + x.song).join('\n')}`) // Формирование и отправка ответа
}

exports.create = async (msg, name) => {
    if (name) { // Если имя плейлиста передано, то создаем его и завершаем работу функции
        return await Albums.create({ owner: msg.author, name: name, songs: [] }).then(() => {
            msg.author.send(`🎉 Успешно создан плейлист с названием **${name}**`)
        })
    }
    msg.author.send("Не может быть плейлиста с пустым именем!")
}

exports.remove = async (msg, name) => {
    const { deletedCount } = await Albums.deleteOne({ owner: msg.author, name: name }) // Удаляем плейлист
    if (deletedCount != 0) { // Если плейлист был найден и удален - пишем положительный вариант
        msg.author.send(`Успешно удален альбом с названием **${name}**`)
    } else {
        msg.author.send(`Альбома с именем **${name}** не существует`)
    }
}

exports.edit = async (msg, name) => {
    const album = await Albums.findOne({ owner: msg.author, name: name })
    if (album) {
        await set_step(msg, name)
    } else {
        msg.author.send(`Альбома с именем **${name}** не существует`)
    }
}