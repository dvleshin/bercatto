
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}
const COLLECTION = 'item'

async function query(filterBy = {}) {

    const criteria = {};
    // if (filterBy.txt) {
    //     criteria.name = filterBy.txt
    // }
    // if (filterBy.minBalance) {
    //     criteria.balance = {$gte : filterBy.minBalance}
    // }


    const collection = await dbService.getCollection(COLLECTION)
    try {
        const items = await collection.find(criteria).toArray();
        return items
    } catch (err) {
        console.log('ERROR: cannot find items')
        throw err;
    }
}

async function getById(itemId) {
    const collection = await dbService.getCollection(COLLECTION)
    try {
        const item = await collection.findOne({"_id":ObjectId(itemId)})
        return item
    } catch (err) {
        console.log(`ERROR: while finding user ${itemId}`)
        throw err;
    }
}

async function remove(itemId) {
    const collection = await dbService.getCollection(COLLECTION)
    try {
        await collection.deleteOne({"_id":ObjectId(itemId)})
    } catch (err) {
        console.log(`ERROR: cannot remove user ${itemId}`)
        throw err;
    }
}

async function update(item) {

    const collection = await dbService.getCollection(COLLECTION)
    try {
        console.log(item);
        
        const itemId = item._id
        delete item._id
        await collection.replaceOne({"_id":ObjectId(itemId)}, {$set : item})
        item._id = itemId
        return item
    } catch (err) {
        console.log(`ERROR: cannot update user ${itemId}`)
        throw err;
    }
}

async function add(item) {
    const collection = await dbService.getCollection(COLLECTION)
    try {
        await collection.insertOne(item);
        return item;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}


