const itemService = require('./item.service')

async function getItem(req, res) {
    const item = await itemService.getById(req.params.id)
    res.send(item)
}
  
const getItems = async (req, res) => {
    const items = await itemService.query()
    res.send(items)
}

async function deleteItem(req, res) {
    await itemService.remove(req.params.id)
    res.send({})
}
async function addItem(req, res) {    
    const item = await itemService.add(req.body)
    res.send(item)
}
async function updateItem(req, res) {        
    const item = await itemService.update(req.body)
    res.send(item)
}

module.exports = {
    getItem,
    getItems,
    deleteItem,
    addItem,
    updateItem
}