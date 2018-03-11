const express = require('express');
const router = express.Router();
const axios = require('axios');
const TaskController = require('../controllers/TaskController');
const JWT = require('../middleware/jwt.js');

/* GET home page. */
// `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=XXXXXXXXXXXXXXXXX&steamid=76561197960434622&format=json`
router.get('/', function(req,res) {

  const steamid = req.body.steamid;
  const baseURL = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAMAPIKEY}&steamid=${steamid}&format=json`
  console.log(baseURL);
  axios.get(baseURL,{
    params: {
      include_appinfo: 1,
      include_played_free_games: 1
    }

  }).then(response => {
    let games = response.data.response.games
    console.log(response.data.response.games);
    let underPlayed = games.filter(game => game.playtime_forever < 600)
    res.status(200).send(underPlayed)
  }).catch(err => {
    // console.log(err);
    res.status(500).send(err)
  })


})

module.exports = router;
