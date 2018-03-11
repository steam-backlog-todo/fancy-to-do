const mongoose = require('mongoose')
const Schema = mongoose.Schema

var TaskSchema = new Schema({
    name : String,
    category : String,
    desc : String,
    progress : {
      type : String,
      default : 'not done'
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    finishedAt: {
      type: Date,
      default: null
    }
})

module.exports = mongoose.model('Task',TaskSchema)
