
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
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
        const user = await collection.findOne({"_id":ObjectId(userId)}) 
        
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
        // console.log('!!!',items);
        
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
        const userId = user._id
        delete user._id
        await collection.replaceOne({"_id":ObjectId(userId)}, {$set : user})
        user._id = userId
        
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function getByEmail(email) {
    const collection = await dbService.getCollection(COLLECTION)
    try {
        const user = await collection.findOne({email})
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}

async function add(user) {
    const userEmail = await getByEmail(user.email)
    if(userEmail) return Promise.reject('This email is already used')
    
    const collection = await dbService.getCollection(COLLECTION)
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}


