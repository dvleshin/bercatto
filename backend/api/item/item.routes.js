const express = require('express')
//const requireAuth = require('../../middlewares/requireAuth.middleware')
const {getItem, getItems, deleteItem, addItem, updateItem} = require('./item.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getItems)
router.get('/:id', getItem)
router.delete('/:id', deleteItem)
router.post('/add', addItem)
router.post('/update', updateItem)

module.exports = router