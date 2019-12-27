const express = require('express')
const router = express.Router()
const SeriesController = require('../controllers/Series')

const basePath = '/series'

router.put(basePath, function (req, res) {
    SeriesController.displaySeries(req, res)
})

router.put(basePath + '/followedSeries', function (req, res) {
    SeriesController.displayFollowedSeries(req, res)
})

module.exports = router