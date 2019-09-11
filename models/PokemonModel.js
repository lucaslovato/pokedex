let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pokemonType = [
  "NORMAL",
  "FIGHT",
  "FLYING",
  "POISON",
  "GROUND",
  "ROCK",
  "BUG",
  "GHOST",
  "STEEL",
  "FIRE",
  "WATER",
  "GRASS",
  "ELECTRIC",
  "PSYCHIC",
  "ICE",
  "DRAGON",
  "DARK",
  "FAIRY"
];

const PokemonSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: "Name is required",
    unique: true
  },
  order: {
    type: Schema.Types.Number,
    unique: true,
    required: "Order is required"
  },
  type: {
    type: [{
      type: Schema.Types.String,
      enum: pokemonType,

    }],
    required: "type is required"
  },
  evolution: {
    type: Schema.Types.ObjectId,
    ref: 'pokemon'
  },
  weakness: {
    type: [{
      type: Schema.Types.String,
      enum: pokemonType
    }],
    required: "At least one weakness is required"
  }
});
module.exports = mongoose.model('pokemon', PokemonSchema);

/*
{	"name": "Bulbasaur",	"order": 1,	"type": "['GRASS', 'POISON']",	"weakness": "['FIRE', 'FLYING', 'ICE', 'PSYCHIC']"}
 */
