const router = require('express').Router();

const {createUrlShortener, getUrlShortener, deleteUrlShortener} = require('../controllers/url')

router.route('/').post(createUrlShortener)
router.route('/:urlShortener').get(getUrlShortener)
router.route('/').delete(deleteUrlShortener)


module.exports = router;