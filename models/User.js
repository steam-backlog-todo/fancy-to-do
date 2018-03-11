const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserShema = new Schema({
    userName : String,
    email: String,
    profile_pic_url: String,
    taskID :[{
        type : Schema.Types.ObjectId,
        ref : 'Task'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model('User',UserShema)
