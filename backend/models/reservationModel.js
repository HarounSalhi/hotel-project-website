const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reservationSchema = new Schema({
  dateArrive: {
    type: Date,
    required: true
  },
  dateDepart: {
    type: Date,
    required: true
  },
  nadlute: {
    type: Number,
    required: true
  },
  nenfant: {
    type: Number,
    required: true
  },
  pension: {
    type: String,
    required: true
  },
  typeChambre: {
    type: String,
    required: true
  },
  coordonneAdule: {
    type: Array,
    required: false
  },
  coordonneEnfant: {
    type: Array,
    required: false
  },
  prix: {
    type: Number,
    required: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Reservation', reservationSchema)