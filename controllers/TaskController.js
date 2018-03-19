const Task = require('../models/Task');
const User = require('../models/User');
module.exports = {
  all: (req,res) => {
    Task.find({})
      .limit(30)
      .exec()
      .then(all => {
        res.status(200).json({
          data: all
        })
      })
  },
  index : (req, res) => {
    let userName = req.decoded.name;
    let email = req.decoded.email;
    User.findOne({
        userName: userName,
        email: email
      }).exec().then(foundUser => {
        if (foundUser == null) {
          return res.status(404).json({
            message: "No matching user was found."
          })
        }
        let userId = foundUser._id
        Task.find({userId : userId, progress:'not done'})
          .sort({createdAt: -1})
          .limit(10).exec().then(foundTasks => {
            res.status(200).json({
              message: 'found tasks',
              data: foundTasks
            })
          })
          .catch(err => {
            res.status(500).json({
              message: err.message
            })
          })
      })
      .catch(err => {
        return res.status(500).json({
          message: "Something went wrong",
          err : err
        })
      })

  },
  indexDone : (req, res) => {
    let userName = req.decoded.name;
    let email = req.decoded.email;
    User.findOne({
        userName: userName,
        email: email
      }).exec().then(foundUser => {
        if (foundUser == null) {
          return res.status(404).json({
            message: "No matching user was found."
          })
        }
        let userId = foundUser._id
        Task.find({userId : userId, progress:'done'})
          .sort({finishedAt: -1})
          .limit(10).exec().then(foundTasks => {
            res.status(200).json({
              message: 'found tasks',
              data: foundTasks
            })
          })
          .catch(err => {
            res.status(500).json({
              message: err.message
            })
          })
      })
      .catch(err => {
        return res.status(500).json({
          message: "Something went wrong",
          err : err
        })
      })

  },
  create : (req, res) => {
    const userId = req.params.userID;
    let userName = req.decoded.name;
    let email = req.decoded.email;
    User.findOne({
        _id: userId,
        userName: userName,
        email: email
      }).exec().then(foundUser => {
        if (foundUser == null) {
          return res.status(404).json({
            message: "No matching user was found."
          })
        }
        let newTask = new Task({
          name : req.body.name,
          category : req.body.category,
          desc : req.body.desc,
          userId: foundUser._id
        })
        console.log(newTask);
        foundUser.taskID.push(newTask._id)
        foundUser.save(()=>{
          newTask.save((err,createdTask)=>{
            if (err) {
              return res.status(500).json({
                message: "Task failed to be created"
              })
            }
            return res.status(200).json({
              message: 'Task created',
              data: createdTask
            })
          })
        })
      })
      .catch(err => {
        return res.status(500).json({
          message: "Something went wrong"
        })
      })

  },

  update : (req, res) => {
    const taskID = req.params.taskID;
    let userName = req.decoded.name;
    let email = req.decoded.email;

    let updateData = {};
    if (req.body.name) {updateData.name = req.body.name}
    if (req.body.category) {updateData.category = req.body.category}
    if (req.body.desc) {updateData.desc = req.body.desc}

    User.findOne({
        userName: userName,
        email: email
      }).exec().then(foundUser => {
        if (foundUser == null) {
          return res.status(404).json({
            message: "No matching user was found."
          })
        }
        Task.findOne({_id:taskID}).exec().then(foundTask => {
          if (String(foundTask.userId) !== String(foundUser._id)) {
            return res.status(404).json({
              message: "No matching task for this user was found."
            })
          }
          console.log('passed :>');
          foundTask.update(updateData, {new: true})
            .exec().then(updatedTask => {
              res.status(200).json({
                message: 'Successfully updated Task data.',
                data : updatedTask
              })
          })
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })

  },

  destroy : (req, res) => {
    const taskID = req.params.taskID;
    let userName = req.decoded.name;
    let email = req.decoded.email;

    User.findOne({
        userName: userName,
        email: email
      }).exec().then(foundUser => {
        if (foundUser == null) {
          return res.status(404).json({
            message: "No matching user was found."
          })
        }

        Task.findOne({_id:taskID}).exec().then(foundTask => {
          if (String(foundTask.userId) !== String(foundUser._id)) {
            return res.status(404).json({
              message: "No matching task for this user was found."
              })
            }
          foundTask.remove().then(deletedTask => {
              res.status(200).json({
                message: 'Task Successfully removed',
                data : deletedTask
              })
          })
          .catch(err => {
            res.status(500).json({
              message: err.message
            })
          })
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })

  },

  finish: (req, res) => {
    console.log(req.body);
    let taskID = req.body.taskID;
    Task.findById(taskID)
      .exec().then(data => {
        if (!data) {
          return res.status(404).json({
            message: 'task not found on db'
          })
        }
        console.log(data);
        console.log('=======');
        console.log(data.progress);
        let updateData = {
          progress: 'done',
          finishedAt: new Date()
        }
        data.update(updateData, {new:true})
          .exec().then(updated => {
            res.status(200).json({
              message: 'task finished!',
              data: updated
            })
          })
      })
      .catch(err => {
        res.status(500).json({
          message: 'server error',
          err:err
        })
      })
  }




};
