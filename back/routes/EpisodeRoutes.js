const express = require('express')
const router = express.Router()
const EpisodeController = require('../controllers/Episode')

const basePath = '/episode'

router.post(basePath + '/mark', function (req, res) {
    EpisodeController.markEpisode(req, res)
})

router.post(basePath + '/unmark', function (req, res) {
    EpisodeController.unmarkEpisode(req, res)
})

module.exports = router