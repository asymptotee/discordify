const Users = require("../Schemes/User")

exports.create = async (id) => { // Создать пользователя
    Users.create({ id: id })
}

exports.get_step = async (user) => { // Получить плейлист пользователя
    const candidate = await Users.findOne({ id: user })
    return candidate.step
}

exports.set_step = async (msg, step) => { // Установить плейлист пользователю
    await Users.findOneAndUpdate({ id: msg.author.id },  { step: step } )
}