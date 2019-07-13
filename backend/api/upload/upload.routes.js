const express = require('express')
const multer = require('multer')
//const requireAuth = require('../../middlewares/requireAuth.middleware')
const {uploadImg} = require('./upload.controller')
const router = express.Router()
const upload = multer({ dest: './uploads/' })

// middleware that is specific to this router
// router.use(requireAuth)

router.post('/img', upload.array('imgs'), uploadImg)

module.exports = router