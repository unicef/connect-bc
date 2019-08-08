const express = require('express')
, router = express.Router()
, UserController = require('../controllers/userController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router