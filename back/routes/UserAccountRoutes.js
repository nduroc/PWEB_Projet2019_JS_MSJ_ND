const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserAccount')

const basePath = '/user'

router.post(basePath, function (req, res) {
    UserController.createUserAccount(req, res)
})

router.post(basePath + '/login', function (req, res) {
    UserController.loginUserAccount(req, res)
})

router.get(basePath + '/logout', function (req, res) {
    UserController.logoutUserAccount(req, res)
})

router.put(basePath + '/:userId', function (req, res) {
    UserController.updateUserAccount(req, res, req.params.userId)
})

router.delete(basePath + '/:userId', function (req, res) {
    UserController.deleteUserAccount(req, res, req.params.userId)
})

module.exports = router