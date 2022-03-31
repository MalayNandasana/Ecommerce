const express = require('express')
const auth = require('../middleware/auth')
const userController = require('../controller/userController')


const router = new express.Router()

router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.post('/users/logout',auth,userController.logout);

module.exports = router