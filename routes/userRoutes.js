const userController = require('../controller/userController')
const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/Auth')

// Test Route
router.get('/test', userController.hello)
