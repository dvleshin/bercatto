
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getUserItems,
    remove,
    update,
    add,
}
const COLLECTION = 'user'

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
        const users = await collection.find(criteria).toArray();
        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection(COLLECTION)
    try {
        console.log('1111',userId);
        
        const user = await collection.findOne({"_id":ObjectId(userId)}) 
        console.log('2222',user);
               
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}

async function getUserItems(userId) {

    // const id = new ObjectId(userId)
    const collection = await dbService.getCollection('item')
    try {
        const items = await collection.find({"ownerId":userId}).toArray()
        console.log('!!!',items);
        
        return items
        
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection(COLLECTION)
    try {
        await collection.deleteOne({"_id":ObjectId(userId)})
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection(COLLECTION)
    try {
        await collection.replaceOne({"_id":ObjectId(user._id)}, {$set : user})
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    
    
    const collection = await dbService.getCollection(COLLECTION)
    try {
        await collection.insertOne(user.user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}


