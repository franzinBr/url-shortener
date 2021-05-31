const router = require('express').Router();
const { getAllurlShortner } = require('../controllers/user');
const {isAuth} = require('../middlewares/auth')

router.route('').get(isAuth, getAllurlShortner)

module.exports = router;