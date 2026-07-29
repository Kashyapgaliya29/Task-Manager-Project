const express = require('express')
const router = express.Router()

const {registerContoller,loginController,logoutController,getMe} = require('../controller/auth.controller')

const protect = require('../middleware/protect.middleware')

const { validateLogin,validateRegister} = require('../middleware/validation.middleware')

router.post('/register',validateRegister,registerContoller)
router.post('/login',validateLogin,loginController)
router.post('/logout',protect,logoutController)
router.get('/me',protect,getMe)

module.exports = router;