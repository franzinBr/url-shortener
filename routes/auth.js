const router = require('express').Router();

const {register, login, refresh ,forgotpassword, resetpassword, verify, logout} = require('../controllers/auth')

router.route('/register').post(register)
router.route('/verify/:tokenVerify').put(verify)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/refresh').post(refresh)
router.route('/forgotpassword').post(forgotpassword)
router.route('/resetpassword/:tokenReset').put(resetpassword)


module.exports = router;