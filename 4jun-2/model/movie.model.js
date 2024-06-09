const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    releaseDate: { type: Date, required: true },
    genre: { type: String, required: true },

},{ versionKey : false,
    timestamps : true,
   });

const MovieModel = mongoose.model('Movie', movieSchema);
module.exports = MovieModel;
