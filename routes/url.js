const router = require('express').Router();

const {createUrlShortener, getUrlShortener, deleteUrlShortener} = require('../controllers/url')
const {isAuth} = require('../middlewares/auth')

router.route('/').post(isAuth, createUrlShortener)
router.route('/:code').get(getUrlShortener)
router.route('/').delete(isAuth, deleteUrlShortener)


module.exports = router;