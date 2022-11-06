const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password, username, tel, address, genre} = req.body

  try {
    const user = await User.signup(email, password, username, tel, address, genre)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const forgot= async (req, res) => {
  try {
    // get email
    const { email } = req.body;

    // check email
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "This email is not registered in our system." });

    // create ac token
    const ac_token = createToken.access({ id: user.id });

    // send email
    const url = `http://localhost:3000/auth/reset-password/${ac_token}`;
    const name = user.name;
    sendMail.sendEmailReset(email, url, "Reset your password", name);

    // success
    res
      .status(200)
      .json({ msg: "Re-send the password, please check your email." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

const reset= async (req, res) => {
  try {
    // get password
    const { password } = req.body;

    // hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // update password
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { password: hashPassword }
    );

    // reset success
    res.status(200).json({ msg: "Password was updated successfully." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

module.exports = { signupUser, loginUser, forgot, reset }