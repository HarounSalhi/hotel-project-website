const express = require('express')

// controller functions
const { loginUser, signupUser, forgot, reset } = require('../controllers/userController')
const resetAuth=require('../middleware/resetAuth')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)
router.post('/forgot_pass', forgot);
router.post('/reset_pass', resetAuth, reset);

module.exports = router