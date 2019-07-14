'use strict'

export default {
    query,
    save,
    remove,
    getById,
}

let users = [
    {
        "_id": "u102",
        "userName": "DimaLeshin",
        "fullName": "dima san",
        "password": "tinkerbell",
        "isAdmin": false,
        "reviews":[],
        "items": [{
            itemId: "i333", name: 'Galaxy 9', imgUrl: 'https://www.ivory.co.il/files/catalog/org/1546430132n32Ry.jpg',
            description: 'A brand new cell phone, great condition'
        }, {
            itemId: "i222", name: 'Dell Vostro 5000', imgUrl: 'https://www.ivory.co.il/files/catalog/reg/1550143356e56RM.jpg',
            description: 'my old leptop, bad condition'
        }],
        "adress": { city: "Jerusalem", country: "Israel" }
    },
    {
        "_id": "u101",
        "userName": "orly_amdadi",
        "fullName": "Orly Amdadi",
        "password": "tinkerbell",
        "isAdmin": true,
        "reviews":[],
        "items": [{
            itemId: "i444", name: 'Sony headphones', imgUrl: 'https://www.ivory.co.il/files/catalog/org/1448463991p91MC.jpg',
            description: 'nice headphones for gameing'
        }],
        "adress": { city: "Jerusalem", country: "Israel" }
    }]

function query() {
    return Promise.resolve(users)
}


function remove(userId) {
    return Promise.resolve(17)
}

function getById(userId) {
    const user = users.find(user => user._id === userId)
    return Promise.resolve(user)
}

function save(editedUser) {
    const userIdx = users.findIndex(user => user._id === editedUser._id)
    users.splice(userIdx , 1 , editedUser)
    return Promise.resolve(editedUser)
}