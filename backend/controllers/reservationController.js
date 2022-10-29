const Reservation = require('../models/reservationModel')
const mongoose = require('mongoose')

// get all reservations
const getReservations = async (req, res) => {
  const user_id = req.user._id

  const reservations = await Reservation.find({user_id}).sort({createdAt: -1})

  res.status(200).json(reservations)
}

// get a single reservation
const getReservation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such reservation'})
  }

  const reservation = await Reservation.findById(id)

  if (!reservation) {
    return res.status(404).json({error: 'No such reservation'})
  }
  
  res.status(200).json(reservation)
}


// create new reservation
const createReservation = async (req, res) => {
  const {dateArrive, dateDepart, nadlute, nenfant, pension, typeChambre,coordonneAdule,coordonneEnfant,prix } = req.body

  let emptyFields = []

  if(!dateArrive) {
    emptyFields.push('dateArrive')
  }
  if(!dateDepart) {
    emptyFields.push('dateDepart')
  }
  if(!nadlute) {
    emptyFields.push('nadlute')
  }
  if(!nenfant) {
    emptyFields.push('nenfant')
  }
  if(!pension) {
    emptyFields.push('pension')
  }
  if(!typeChambre) {
    emptyFields.push('typeChambre')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'veuillez remplir tous les champs!', emptyFields })
  }
  if(nadlute<1||nadlute>4){
    return res.status(400).json({ error: 'veuillez saisir le nombre des adultes coorecte!', emptyFields }) 
  }
  if(nenfant<0||nenfant>4){
    return res.status(400).json({ error: 'veuillez saisir le nombre des enfants coorecte!', emptyFields }) 
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const reservation = await Reservation.create({dateArrive, dateDepart, nadlute, nenfant, pension, typeChambre,coordonneAdule,coordonneEnfant,prix, user_id})
    res.status(200).json(reservation)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a reservation
const deleteReservation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such reservation'})
  }

  const reservation = await Reservation.findOneAndDelete({_id: id})

  if (!reservation) {
    return res.status(400).json({error: 'No such reservation'})
  }

  res.status(200).json(reservation)
}

// update a reservation
const updateReservation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such reservation'})
  }

  const reservation = await Reservation.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!reservation) {
    return res.status(400).json({error: 'No such reservation'})
  }

  res.status(200).json(reservation)
}


module.exports = {
  getReservations,
  getReservation,
  createReservation,
  deleteReservation,
  updateReservation
}