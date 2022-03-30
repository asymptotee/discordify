const GeneralMsgHandler = require('./services/list')
const EditorMsgHandler = require("./services/editor")
const InteractionHandler = require("./services/interaction")
const { get_step } = require('./services/user')

exports.msg_controller = async (msg) => { // Хэндлер команд
    const source = msg.content.replace(/ +/g, ' ').trim().split(' ') // Убираем лишние пробелы, засовываем в массив все слова через пробел
    const command = source[0]
    source.shift()
    const step = await get_step(msg.author.id)
    const Handler = new GeneralMsgHandler(msg, source.join(" "));
    if (step == "default") {
        switch (command) {
            case "!list": // Показать все плейлисты
                Handler.show()
            break;
            case "!show": // Показать что находится в плейлисте
                Handler.explore()
            break;
            case "!create": // Создать плейлист
                Handler.create()
            break;
            case "!delete": // Удалить плейлист
                Handler.delete()
            break;
            case "!edit": // Перейти в режим редактирования 
                Handler.edit()
            break;
            case "!help":
                Handler.help()
            break;
        }
    } else {
        switch (command) {
            case "!save": // Сохранить и выйти в главное меню
                Handler.save()
            break;
            case "!add": // Добавить трек ( показать drop-down )
                Handler.search()
            break;
            case "!shuffle": // Перемешать плейлист
                Handler.shuffle()
            break;
            case "!remove": // Удалить трек в плейлисте
                Handler.remove()
            break;
            case "!help": // Помощь по командам
                Handler.help()
            break;
        }
    }
}

exports.interaction_controller = async (interaction) => { // Хэндлер интеракшенов ( выбора пункта в drop-down )
    const step = await get_step(interaction.user.id)
    const Handler = new InteractionHandler(interaction)
    if (step != "default") {
        Handler.add()
    }
}
