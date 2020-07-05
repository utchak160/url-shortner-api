const Url = require('../models/url');
const dns = require('dns');
const { nanoid } = require('nanoid');

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

const createShortUrl = async (req, res, next) => {
    const { originalUrl } = req.body;
    const shortId = nanoid(4);
    const urlExist = await Url.findOne({originalUrl});
    if (urlExist) {
        return res.send({
            message: 'This link already has it\'s shortUrl',
            link: urlExist.originalUrl,
            shortUrl: urlExist.shortUrl
        });
    }
    const shortUrl = baseUrl + '/' + shortId;
    const url = new Url({
        originalUrl,
        shortUrl
    });
    await url.save();
    res.status(201).json({
        message: 'Success',
        shortUrl
    });
}

const openShortUrl = async (req, res, next) => {
    const shortUrl = baseUrl + '/' + req.params.shortId;
    try{
        const url = await Url.findOne({shortUrl});
        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({error: 'Page not found'});
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({error: 'Server Error'});
    }
}

module.exports = {
    createShortUrl, openShortUrl
}
