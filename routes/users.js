const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const JWT = require('../middleware/jwt.js');
const memUpload = require('../middleware/multer.js');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/task/:id', JWT.authJWT, UserController.index) // get data of user and todo task
// router.post('/add', JWT.authAdminJWT , UserController.create) // add user, admin only, me!
// router.put('/edit/:id', JWT.authJWT, UserController.update) //edit user data, auth user
// router.delete('/delete/:id', JWT.authJWT ,UserController.destroy) //delete user data, auth user

router.put('/steamid',memUpload.single(''), JWT.authJWT, UserController.steamid) //edit user data, auth user

module.exports = router;
