const express = require('express')
const router = express.Router()

const {registerContoller,loginController} = require('../controller/auth.controller')

router.post('/register',registerContoller)
router.post('/login',loginController)

module.exports = router;