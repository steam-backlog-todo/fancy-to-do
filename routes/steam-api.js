const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const UserController = require('../controllers/UserController.js');
const JWT = require('../middleware/jwt.js');
const SteamController = require('../controllers/SteamController.js');
const memUpload = require('../middleware/multer.js');


/* GET home page. */
// `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=XXXXXXXXXXXXXXXXX&steamid=76561197960434622&format=json`

// request => authJWT => get steamid, create new tasks, add tasks to dbs

router.post('/', memUpload.single(''), JWT.authJWT, SteamController.getGames)
// router.post('/add', memUpload.single(''), JWT.authJWT, SteamController.addOne)
// router.post('/add-all', JWT.authJWT, SteamController.getOwnedGames)

module.exports = router;
