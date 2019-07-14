'use strict'
import httpService from './HttpService';

export default {
    query,
    save,
    remove,
    getById,
    getTrendingItems,
    uploadImage
}

let items = [{
        "_id": "i222",
        "name": 'xbox 360',
        "category": 'tech',
        "ownerId": 'u102',
        "imgUrl": 'https://www.ivory.co.il/files/catalog/reg/1550143356e56RM.jpg',
        "views": 30,
        "description": 'A brand new guitar great condition',
        "condition": 'new',
        "value": 1200, 
        "tags": ['tech', 'gaming', 'video game'],
        "uploadedAt": 124325235
    },
    {
        "_id": "i333",
        "name": 'Laptop',
        "category": 'tech',
        "ownerId": 'u102',
        "imgUrl": 'https://www.ivory.co.il/files/catalog/org/1546430132n32Ry.jpg',
        "views": 1,
        "description": 'A brand new guitar great condition',
        "condition": 'new',
        "tags": ['tech', 'gaming', 'video game'],
        "uploadedAt": 124325235
    },
    {
        "_id": "i444",
        "name": 'xbox 360',
        "category": 'tech',
        "ownerId": 'u101',
        "imgUrl": 'https://www.ivory.co.il/files/catalog/org/1448463991p91MC.jpg',
        "views": 40,
        "description": 'A brand new guitar great condition',
        "condition": 'new',
        "tags": ['tech', 'gaming', 'video game'],
        "uploadedAt": 124325235
    }
]

function query(creteria = { txt: '' }) {
    
    const itemsToShow = items.filter(item=> {
      return item.tags.some(tag=> {
          return tag===creteria.txt
      })  
  })
    return Promise.resolve(itemsToShow)
}

function getTrendingItems() {
    return Promise.resolve(items)
}

function remove(itemId) {
    return Promise.resolve(17)
}

function getById(itemId) {
    const item = items.find(item => item._id === itemId)
    return Promise.resolve(item)
}

function save(item) {
    items.unshift(item)
    return Promise.resolve(item)
}

async function uploadImage(formData) {
    let endpoint = `upload/img`
    return await httpService.post(endpoint, formData)
}


function _getUrl(id = '') {
    return `item/${id}`
}