const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {updateUser,getUserItems, getUser, getUsers, deleteUser} = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getUsers)
router.get('/items/:id', getUserItems)
router.get('/:id', getUser)
router.delete('/:id',  requireAuth, deleteUser)
router.put('/update', updateUser)

module.exports = router