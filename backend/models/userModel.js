const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique:true
  },
  tel: {
    type: Number,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  genre: {
    type: String,
    required: false
  }
})

// static signup method
userSchema.statics.signup = async function(email, password, username, tel, address, genre) {

  // validation
  if (!email || !password || !username) {
    throw Error('Veuillez remplir tous les champs')
  }
  if (!validator.isEmail(email)) {
    throw Error('Invalid mail')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Le mot de passe doit contenir majuscule, miniscile, nombre, catartére spécial et doit au moins être 8 caractéres long')
  }


  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('email n\'est pas disponible')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash, username, tel, address, genre })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('Veuillez remplir tous les champs')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)