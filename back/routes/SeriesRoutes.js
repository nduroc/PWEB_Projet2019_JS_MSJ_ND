const express = require('express');
const router = express.Router();
const SeriesController = require('../controllers/Series');

const basePath = '/series';

router.get(basePath + '/followedSeries', function (req, res) {
    SeriesController.displayFollowedSeries(req, res);
})

router.get(basePath + '/episodesSeen', function (req, res) {
    SeriesController.displayEpisodesSeen(req, res);
})

module.exports = router;