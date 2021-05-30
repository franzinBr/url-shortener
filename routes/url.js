const router = require('express').Router();

const {createUrlShortener, getUrlShortener, deleteUrlShortener} = require('../controllers/url')
const {isAuth} = require('../middlewares/auth')

router.route('/').post(isAuth, createUrlShortener)
router.route('/:urlShortener').get(getUrlShortener)
router.route('/').delete(deleteUrlShortener)


module.exports = router;