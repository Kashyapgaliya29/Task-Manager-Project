const express = require('express')
const router = express.Router()

const {registerContoller,loginController,logoutController,getMe} = require('../controller/auth.controller')

const protect = require('../middleware/protect.middleware')

router.post('/register',registerContoller)
router.post('/login',loginController)
router.post('/logout',protect,logoutController)
router.get('/me',protect,getMe)

module.exports = router;