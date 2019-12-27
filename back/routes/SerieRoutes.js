const express = require('express')
const router = express.Router()
const SerieController = require('../controllers/Serie')

const basePath = '/serie'

router.get(basePath + '/episodes', function (req, res) {
    SerieController.displaySerieEpisode(req, res)
})

router.post(basePath + '/follow', function (req, res) {
    SerieController.followSerie(req, res)
})

router.delete(basePath + 'unfollow', function(req, res) {
    SerieController.unfollowSerie(req, res)
})

module.exports = router