const mongoose = require("mongoose")

const AlbumSchema = new mongoose.Schema({
  owner: String,
  name: String,
  songs: [
    { 
      singer: String,
      song: String
    }
  ]
})

module.exports = mongoose.model("Album", AlbumSchema)