const userService = require('./user.service')

async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
    res.send(user)
}
  
const getUsers = async (req, res) => {
    const users = await userService.query()
    res.send(users)
}
const getUserItems = async (req, res) => {
    const items = await userService.getUserItems(req.params.id)
    res.send(items)
}

async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.send({})
}

const updateUser = async (req, res) => {

    
    const user = await userService.update(req.body)
    res.send(user)
}


module.exports = {
    getUser,
    getUsers,
    deleteUser,
    getUserItems,
    updateUser
}