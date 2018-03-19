const FB = require('fb');
const User = require('../models/User')

class TokenController {

  static tokenToClient(req, res){

    User.findOne({email: req.body.response.email})
      .exec()
      .then(foundUser => {
        // console.log(foundUser);

        if (foundUser) {
          let data = {
            token:req.token,
            fbData: req.body.response,
            userData: foundUser,
            message:'jwt login succesful'
          }
          return res.status(200).send(data)
        } else {
          let newUser = new User({
            userName: req.body.response.name,
            email: req.body.response.email,
            profile_pic_url: req.body.response.picture.data.url
          })

          newUser.save((err,createdUser)=>{
            if (err) {
              return res.status(500).json({
                message: "User failed to be created"
              })
            }
            let data = {
              token:req.token,
              fbData: req.body.response,
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
