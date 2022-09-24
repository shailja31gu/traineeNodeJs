const express = require('express');
const router = express.Router();

//--------------------------------------------------
const adminController = require ('../controllers/adminController')
const userrController =require('../controllers/userrController')
const taskController = require ('../controllers/taskController')
const mw = require("../middeleware/auth")

router.post("/registerAdmin",adminController.registered )
router.post("/login", adminController.login)
 
router.post("/user",mw.authentication, userrController.createUser )

router.post('/tasks',mw.authentication, taskController.createTask)

router.get('/allUsertask',mw.authentication, taskController.getUserTask)
 

module.exports = router;