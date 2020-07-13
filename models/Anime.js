const mongoose = require ('mongoose');

const animeSchema = new mongoose.Schema({
    animeNameENG: String,
    animeNameJP: String,
    numEpisodes: Number,
    mangaChapLeft: Number,
    adaptionType: String,
    imgUrl: String
});


module.exports = mongoose.model('Anime', animeSchema);
