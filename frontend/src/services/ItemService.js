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
        "name": 'Dell Vostro 5000',
        "category": 'tech',
        "ownerId": 'u102',
        "imgUrl": 'https://www.ivory.co.il/files/catalog/reg/1550143356e56RM.jpg',
        "views": 30,
        "description": 'my old leptop, bad condition',
        "condition": 'new',
        "value": 1200, 
        "tags": ['tech', 'computer', 'laptop'],
        "uploadedAt": 124325235
    },
    {
        "_id": "i333",
        "name": 'Galaxy 9',
        "category": 'tech',
        "ownerId": 'u102',
        "imgUrl": 'https://www.ivory.co.il/files/catalog/org/1546430132n32Ry.jpg',
        "views": 1,
        "description": 'A brand new cell phone, great condition',
        "condition": 'new',
        "tags": ['tech', 'phone', 'galaxy'],
        "uploadedAt": 124325235
    },
    {
        "_id": "i444",
        "name": 'Sony headphones',
        "category": 'tech',
        "ownerId": 'u101',
        "imgUrl": 'https://www.ivory.co.il/files/catalog/org/1448463991p91MC.jpg',
        "views": 40,
        "description": 'nice headphones for gameing',
        "condition": 'new',
        "tags": ['music', 'tech', 'headphones'],
        "uploadedAt": 124325235
    }
]

async function query(creteria = { txt: '' }) {
    return await httpService.get(_getUrl()) 
}

async function getTrendingItems() {
    // db.collection.find().sort({views:-1}).limit(10)
    return await httpService.get(_getUrl())
}

async function remove(itemId) {
    return await httpService.delete(_getUrl(itemId))
}

async function getById(itemId) {
    return await httpService.get(_getUrl(itemId))
}

async function save(item) {
   if(!item.id) {
       return await httpService.post(`item/add`,item )
   }
   else {
       return await httpService.post(`item/update`,item )
   }
}

async function uploadImage(formData) {
    let endpoint = `upload/img`
    return await httpService.post(endpoint, formData)
}


function _getUrl(id = '') {
    return `item/${id}`
}