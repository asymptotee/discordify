const Users = require("../Schemes/User")

exports.create = async (id) => {
    Users.create({ id: id, step: 0 })
}

exports.get_step = async (msg) => {
    const candidate = await Users.findOne({ id: msg.author.id })
    return candidate.step
}

exports.set_step = async (msg, step: string) => {
    const steps = await Users.findOneAndUpdate({ id: msg.author.id },  { step: step } )
}