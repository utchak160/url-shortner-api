const express = require('express');
const { createShortUrl, openShortUrl } = require('../controllers/url-controller');
const router = express.Router();

router.post('/shortUrl', createShortUrl);
router.get('/:shortId', openShortUrl);

module.exports = router;
