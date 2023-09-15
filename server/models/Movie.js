const { Schema } = require('mongoose');


const movieSchema = new Schema({
  year: 
    {
      type: String,
    },
  
  plot: {
    type: String,
    required: true,
  },

  movieId: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
  },
  genre: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = movieSchema;