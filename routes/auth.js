const router = require('express').Router();

const {register, login, forgotpassword, resetpassword} = require('../controllers/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/forgotpassword').post(forgotpassword)
router.route('/resetpassword/:tokenReset').post(resetpassword)


module.exports = router;