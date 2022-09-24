const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: "task name is required",
        trim:true
    },
    
    taskType: {
        type: String,
        enum: ['pending','done'],
        required: true,

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userss",
        required: true
    },
    

}, { timestamps: true })
module.exports = mongoose.model('tasks', taskSchema)