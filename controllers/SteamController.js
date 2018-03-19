const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');
const axios = require('axios');

module.exports = {
  getGames: (req, res) => {
    let steamid = req.body.steamid;

    const baseURL = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAMAPIKEY}&steamid=${steamid}&format=json`
    axios.get(baseURL,{
      params: {
        include_appinfo: 1,
        include_played_free_games: 1
      }
    }).then(response => {
      let games = response.data.response.games
      let underPlayed = games.filter(game => game.playtime_forever < 600)
      res.status(200).json({
        message: 'Successfully found steam games',
        games : underPlayed
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Server error'
      });
    })
  },
  getOwnedGames: (req, res) => {
    console.log('=======steam controller========');
    User.findOne({
      userName: req.decoded.name,
      email: req.decoded.email
    }).exec().then(foundUser => {
      if (!foundUser.steamid) {
        return res.status(404).json({
          message: `User's steamid is not found.`
        })
      }
      const steamid = foundUser.steamid;
      const baseURL = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAMAPIKEY}&steamid=${steamid}&format=json`
      axios.get(baseURL,{
        params: {
          include_appinfo: 1,
          include_played_free_games: 1
        }
      }).then(response => {
        let games = response.data.response.games
        let underPlayed = games.filter(game => game.playtime_forever < 600)

        let steamTasks = [];
        let tasksId = []
        underPlayed.forEach(game => {
          let newTask = new Task({
            name: game.name,
            category: 'Steam Games',
            desc : '',
            userId: foundUser._id
          })
          steamTasks.push(newTask)
          tasksId.push(newTask._id)
        })

        // console.log(steamTasks);
        // console.log(tasksId);
        // console.log('done!');

        foundUser.taskID.push(...tasksId)
        foundUser.save(()=> {
          Task.insertMany(steamTasks).then(data=>{
            res.status(200).json({
              message: 'steam tasks added',
              data: data
            })
          })
        })

      }).catch(err => {
        return res.status(500).send(err)
      })
    }).catch(err => {
      res.status(500).json({
        message: 'Server error'
      });
    });


  }

};
