const router = require('express').Router();

const {register, login, refresh ,forgotpassword, resetpassword} = require('../controllers/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/refresh').post(refresh)
router.route('/forgotpassword').post(forgotpassword)
router.route('/resetpassword/:tokenReset').post(resetpassword)


module.exports = router;