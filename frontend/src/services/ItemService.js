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
   if(!item._id) {
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