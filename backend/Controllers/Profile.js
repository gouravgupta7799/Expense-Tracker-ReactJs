
const User = require('../Models/AuthanticationModel')

exports.completeProfle = async (req, res) => {

  try {

    const user = await User.findById(req.userId._id);

    if (req.body.photoUrl && req.body.displayName) {

      user.photoUrl = req.body.photoUrl
      user.displayName = req.body.displayName

      const updatedProfile = await user.save()
      res.status(200).json({ user: updatedProfile })
    } else {
      res.status(404).json({ error: 'can not update now try again later' })
    }

  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.userProfle = (req, res) => {
  try {
    const user = req.userId
    if (user) {
      res.status(200).json({ user })
    } else {
      res.status(401).json({ msg: 'user not found' })
    }
  } catch (er) {
    res.status(500).json({ error: er })
  }
}