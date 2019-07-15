'use strict'
import httpService from './HttpService';

export default {
    query,
    save,
    remove,
    getById,
    getUserItems,
    doLogin,
    doLogout,
    getLoggedinUser,
}

const KEY = 'loggedInUser'

async function query() {
    return await httpService.get(_getUrl())
}

async function remove(userId) {
    return await httpService.delete(_getUrl(userId))
}

async function getById(userId) {
    console.log(userId);
    return await httpService.get(_getUrl(userId))
}
async function getUserItems(userId) {
    return await httpService.get(`user/items/${userId}`)
}

// function save(editedUser) {
//     return httpService.post(`auth/signup`,editedUser )
//         .then (user=>_handleSuccessfulRegister(user))
// }

async function save(editedUser) {
    const completeUser = await httpService.post(`auth/signup`, editedUser)
    try {
        _handleSuccessfulRegister(completeUser)
        return completeUser
    } catch (err) {
        console.log('User Service save function error:', err);
        throw err;
    }
}

async function doLogin(userCred) {
    const userLoggedIn = await httpService.post(`auth/login`, userCred)
    try {
        //console.log('UserService', userLoggedIn);
        _handleSuccessfulRegister(userLoggedIn)
        return userLoggedIn
    } catch (err) {
        console.log('User Service save function error:', err);
        throw err;
    }
}
async function doLogout(){
    const userLoggetOut = await httpService.post(`auth/logout`)
    try {
        sessionStorage.removeItem(KEY)
    } catch (err) {
        console.log('User Service Log Out error:', err);
        throw err;
    }
}

function _handleSuccessfulRegister(user) {
    sessionStorage.setItem(KEY, JSON.stringify(user));
    return user;
}

function getLoggedinUser() {
    var loggedInUser = sessionStorage.getItem(KEY)
    return JSON.parse(loggedInUser);
}

function _getUrl(id = '') {
    return `user/${id}`
}