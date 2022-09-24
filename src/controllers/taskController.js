const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
let taskModel = require('../models/taskModel')
let userModel = require('../models/userModel')


const isValid = function(value){
    if(typeof value === 'undefined'|| value ===  null) {return false}
    if(typeof value === 'string' && value.trim().length > 0) {return true}
  }

  const isValidObjectId = function(ObjectId){
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValidRequestBody= function (requestBody){
    return Object.keys(requestBody).length>0
  }

  const createTask = async function(req,res){
    try{
        const requestBody = req.body
        if (!isValidRequestBody(requestBody)){
            return res.status(400).send({status: false,message:'please provide user task'})
        }

        const {taskName, taskType, userId } = requestBody

        if (!isValid(taskName)) {
            return res.status(400).send({status:false, message:"task name is required"})
           }

        if (!isValid(taskType)){
            return res.status(400).send({status:false, message: 'task type should be pending or done'})
        }  
        
        if (!isValid(userId)){
            return res.status(400).send({status: false, message: `${userId} is not a valid userid.`})
        }

        if(!isValidObjectId(userId)){
           return res.status(400).send({status: false, message:'userId is required'})
        }

        const newTask = await taskModel.create(requestBody)
        return res.status(201).send({ status:true, message: 'new task created successfully', data:newTask })
    }
    catch(error){
      res.status(500).send({status: false, message: error.message})
    }  
  }


     const getUserTask =  async function(req,res){

        try{
            let allUsers = await taskModel.find().populate('userId','name mobile email _id ')
            return res.status(200).send({status: true,data: allUsers})
        }
        catch(error){
             return res.status(500).send(error.message)
        }
     }

  module.exports.createTask = createTask
  module.exports.getUserTask = getUserTask