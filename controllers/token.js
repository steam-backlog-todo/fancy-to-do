const FB = require('fb');
const User = require('../models/User')

class TokenController {

  static tokenToClient(req, res){

    User.findOne({email: req.response.email})
      .exec()
      .then(foundUser => {
        // console.log(foundUser);

        if (foundUser) {
          let data = {
            token:req.token,
            fbData: req.response,
            userData: foundUser,
            message:'jwt login succesful'
          }
          return res.status(200).send(data)
        } else {
          let newUser = new User({
            userName: req.response.name,
            email: req.response.email,
            profile_pic_url: req.response.picture.data.url
          })

          newUser.save((err,createdUser)=>{
            if (err) {
              return res.status(500).json({
                message: "User failed to be created"
              })
            }
            let data = {
              token:req.token,
              fbData: req.response,
              userData: createdUser,
              message:'jwt login succesful'
            }
            return res.status(200).send(data)
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'Something went wrong'
        })
      })
  }

}

module.exports = TokenController;
