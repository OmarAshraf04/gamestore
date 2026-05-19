const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  price:       { type: Number, required: true },
  category:    { type: String, required: true },
  description: { type: String, required: true },
  image:       { type: String, required: true },
  rating:      { type: Number, default: 0 }
});

module.exports = mongoose.model('Game', gameSchema);