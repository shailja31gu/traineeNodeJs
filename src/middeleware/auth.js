const jwt = require("jsonwebtoken")


const authentication = async function ( req, res, next){
    try{
        let token = req.headers["x-api-key"]
        if (!token){
            return res.status(401).send({ status: false, message: "important header missing"})
        }
        let decodeToken = jwt.verify(token, 'assignment')
        if (!decodeToken) return res.status(401).send({ status: false, message: "token is not valid"})
    }catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
    next()

}

// const authorisation = async function ( req, res, next){
//     try{
//         let token = req.headers["x-api-key"]
//         let decodeToken = jwt.verify(token, 'assignment')
//         let adminLoggingIn = req.params.adminId
//         let adminLoggedIn = (decodeToken.id)

//         let value = await 
//     }
// }

module.exports.authentication = authentication

