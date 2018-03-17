const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const JWT = require('../middleware/jwt.js');


/* GET tasks listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/search', JWT.authJWT, TaskController.index) // search for task for user
router.post('/add/:userID', JWT.authJWT, TaskController.create) // add task to user, auth user
router.put('/edit/:taskID', JWT.authJWT, TaskController.update) //edit task data, auth user
router.delete('/delete/:taskID', JWT.authJWT, TaskController.destroy) //delete task data, auth user

module.exports = router;
