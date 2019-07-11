'use strict'

export default {
    query,
    add,
    remove,
    getById,
    update,
}

let items = [{
    "_id": "5c09",
    "name": 'xbox 360',
    "category": 'tech',
    "owner": 'u101',
    "imgUrl": 'http://lorem.jpg',
    "views": 20,
    "description": 'A brand new guitar great condition',
    "condition": 'new',
    "tags": ['tech', 'gaming', 'video game'],
    "uploadedAt": 124325235
},
{
    "_id": "4593",
    "name": 'Laptop',
    "category": 'tech',
    "owner": 'u101',
    "imgUrl": 'http://lorem.jpg',
    "views": 20,
    "description": 'A brand new guitar great condition',
    "condition": 'new',
    "tags": ['tech', 'gaming', 'video game'],
    "uploadedAt": 124325235
},
{
    "_id": "5209",
    "name": 'xbox 360',
    "category": 'tech',
    "owner": 'u101',
    "imgUrl": 'http://lorem.jpg',
    "views": 20,
    "description": 'A brand new guitar great condition',
    "condition": 'new',
    "tags": ['tech', 'gaming', 'video game'],
    "uploadedAt": 124325235
}]

function query() {
    return items
}

function add(item) {
    items.push(item)
}

function remove(itemId) {
    let idx = items.findIndex(item => item._id === itemId)
    items.splice(idx, 1)
}

function getById(itemId) {
    return items.find(item => item._id === itemId)
}

function update(item) {
    let idx = items.findIndex(currItem => currItem._id === item._id)
    items.splice(idx, 1, item)
}