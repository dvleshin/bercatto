const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(email, password) {
    logger.debug(`auth.service - login with email: ${email}`)
    if (!email || !password) return Promise.reject('email and password are required!')

    const user = await userService.getByEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')
    delete user.password;
    return user;
}

async function signup(user) {
    logger.debug(`auth.service - signup with email: ${user.email}, username: ${user.username}`)
    if (!user) return Promise.reject('email, username and password are required!')

    // const hash = await bcrypt.hash(user.password, saltRounds)
    
    const completeUser = await userService.add(user)
    delete user.password;
    return completeUser;
}

module.exports = {
    signup,
    login,
}