'use strict'

export default {
    query,
    save,
    remove,
    getById,
    
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
    return Promise.resolve([{
        "_id": "5c09",
        "name": 'xbox 360',
        "category": 'tech',
        "owner": 'u101',
        "imgUrl": 'http://lorem.jpg',
        "views": 30,
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
        "views": 1,
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
        "views": 40,
        "description": 'A brand new guitar great condition',
        "condition": 'new',
        "tags": ['tech', 'gaming', 'video game'],
        "uploadedAt": 124325235
    }])
}

function remove(itemId) {
  return Promise.resolve(17)
}

function getById(itemId) {
    return Promise.resolve(17)
}

function save(item) {
    return Promise.resolve(17)
}