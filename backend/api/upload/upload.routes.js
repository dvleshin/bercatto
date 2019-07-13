const express = require('express')
//const requireAuth = require('../../middlewares/requireAuth.middleware')
const {uploadImg} = require('./upload.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.post('/img', uploadImg)

module.exports = router