const userController = require('../controller/userController')
const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/Auth')


// Test Route
router.get('/test', userController.hello)

// route to register the user
router.post('/register/user', userController.registeruser)



// router to get all users
router.get('/users', isAuthenticated, userController.getAllUsers)

// router to find by id
router.get('/userbyid', isAuthenticated, userController.findbyId)


// router to delete
router.delete('/deletebyid', isAuthenticated, userController.deletebyId)

// router to update
router.put('/updatebyid', isAuthenticated, userController.updateuser)

// /router to Login
router.post('/login', userController.login)


// addroles
router.post('/addrole', userController.addroles)

module.exports = router

