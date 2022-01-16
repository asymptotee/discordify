const { show, explore, create, remove, edit } = require('./services/list')
const { save, search } = require("./services/editor")
const { get_step } = require('./services/user')
exports.handle = async (msg) => {
    const command: string[] = msg.content.replace(/ +/g, ' ').trim().split(' ') // Убираем лишние пробелы, засовываем в массив все слова через пробел
    const step = await get_step(msg)
    if (step == "default") {
        switch (command[0]) {
            case "!list":
                show(msg)
            break;
            case "!show":
                explore(msg, command[1])
            break;
            case "!create":
                create(msg, command[1])
            break;
            case "!delete":
                remove(msg, command[1])
            break;
            case "!edit":
                edit(msg, command[1])
            break;
        }
    } else {
        switch (command[0]) {
            case "!save":
                save(msg)
            break;
            case "!search":
                search(msg, command[1])
            break;
        }
    }
}