const userModel = require("../models/userModel")


const isValid = function(value){
  if(typeof value === 'undefined'|| value ===  null) {return false}
  if(typeof value === 'string' && value.trim().length > 0) {return true}
}

const createUser = async function (req, res) {
    try {
        var data = req.body
        if(!Object.keys(data).length > 0){
        return  res.status(400).send({status:false,message:"please enter some data"})
          
        }

const {name,mobile,email} = data  


if (!isValid(name)) {
 return res.status(400).send({status:false, message:"name is required"})
}

if (!isValid(mobile)) {
  return res.status(400).send({status:false, message:"contact number is required"})
  
}
if (!isValid(email)) {
     return res.status(400).send({status: false, message: "emailId is required"})
}

let Email = email
let validateEmail = function (Email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)
}

if(!validateEmail(Email)) {
    return res.status(400).send({status:false, message:"please enter a valid email"})
  
}
 
const Phone = mobile
const validatePhone = function (Phone) {
      return /^[6-9]\d{9}$/.test(Phone)
}

if (!validatePhone(Phone)) {
    return res.status(400).send({status: false, message: "please enter valid phone"})
}

const isEmailAlreadyUsed= await userModel.findOne({ email })

if(isEmailAlreadyUsed){
   return res.status(400).send({status:false, message:`${email} email is already registered`})

}

const mobileAlredyUsed = await userModel.findOne({ mobile })

if (mobileAlredyUsed) {
return res.status(400).send({status:false, message: `${mobile} mobile already registered`})

}

const createdUser = await userModel.create(data)
res.status(201).send({status:true, data: createdUser})
 
} 
 catch (error) {
        res.status(500).send({ status: "failed", message: error.message })
    }
  }

module.exports.createUser = createUser
