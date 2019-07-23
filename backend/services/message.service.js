const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    getById,
    update,
    add
}
const COLLECTION = 'messages'

async function getById(arenaId) {
    console.log('Got here', arenaId);

    const collection = await dbService.getCollection(COLLECTION)
    try {
        const msgs = await collection.findOne({"arenaId": arenaId})
        return msgs
    } catch (err) {
        console.log(`ERROR: while getting arenaId ${arenaId}`)
        throw err;
    }
}

async function update(arenaId) {

    const collection = await dbService.getCollection(COLLECTION)
    try {
        const itemId = item._id
        delete item._id
        await collection.replaceOne({"_id": ObjectId(itemId)}, {$set: item})
        item._id = itemId
        return item
    } catch (err) {
        console.log(`ERROR: cannot update user ${itemId}`)
        throw err;
    }
}

async function add(msgs) {
    console.log('got to add*****');

    const collection = await dbService.getCollection(COLLECTION)
    try {
        await collection.insertOne(msgs);
        return msgs;
    } catch (err) {
        console.log(`ERROR: cannot insert msgs`)
        throw err;
    }
}