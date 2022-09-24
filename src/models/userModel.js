const mongoose = require('mongoose')
//const validator = require('validator')

const mobileValidation = function(mobile){
    let regexForMob = /^[6-9]\d{9}$/
    return regexForMob.test(mobile)
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim:true
    },
     
    // adminId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     require: "please enter admin id",
    //     ref: "Admin"
    // },

    mobile: {
          type: Number,
          requried: true,
          unique: true,
          validate:[mobileValidation, "please enter a valid mobile No."],
          trim: true
    },

    email: {
        type:String,
        requried:  'Email address  is required',
        unique: true,
        trim: true,
        lowercase:true,
        validate:{
            validator:function(email){
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        },
            msg:'Please fill a valid email address', isAsync:false
        } 
    },
      

}, { timestamps: true })
module.exports = mongoose.model('userss', userSchema)
