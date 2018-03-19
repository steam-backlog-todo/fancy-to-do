const User = require('../models/User');
module.exports = {

  index : (req, res) => {
    User.findOne({_id: req.params.id})
      .populate('taskID')
      .exec()
      .then(foundUser => {
        res.status(200).json({
          message: 'found user',
          data: foundUser
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  create : (req, res) => {
    let newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      profile_pic_url: req.profile_pic_url
    })

    newUser.save((err,createdUser)=>{
      if (err) {
        return res.status(500).json({
          message: "User failed to be created"
        })
      }
      return res.status(200).json({
        message: 'User created',
        data: createdUser
      })
    })
  },

  update : (req, res) => {
    const id = req.params.id;
    let updateData = {};
    if (req.body.userName) {updateData.userName = req.body.userName}
    if (req.body.email) {updateData.email = req.body.email}
    if (req.body.profile_pic_url) {updateData.profile_pic_url = req.body.profile_pic_url}
    if (req.body.steamid) {updateData.steamid = req.body.steamid}

    User.findByIdAndUpdate({ _id : id }, updateData, {new: true})
      .exec()
      .then(updatedUser => {
        res.status(200).json({
          message: 'Successfully updated User data.',
          data : updatedUser
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  destroy : (req, res) => {
    const id = req.params.id;
    User.findOneAndRemove({ _id: id})
      .exec()
      .then(User => {
        res.status(200).json({
          message: 'User Successfully removed'
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  steamid: (req, res) => {
    let id = req.body.userID;
    let update = {
      steamid: req.body.steamid
    };
    User.findByIdAndUpdate({_id: id}, update, {new: true})
      .exec().then(updated => {
        res.status(200).json({
          message: 'Successfully added steamid',
          steamid: updated.steamid
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Server error',
          err: err
        })
      })
  }

};
