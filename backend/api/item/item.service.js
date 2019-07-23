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

    // console.log('item service filterBy:', filterBy);

    const filterCriteria = {};
    const sortCriteria = {}
    let limit = 0;
    if (filterBy.name) filterCriteria.name = filterBy.name
    if (filterBy.condition) filterCriteria.condition = filterBy.condition
    if (filterBy.category) filterCriteria.category = filterBy.category
    if (filterBy.byViews) sortCriteria.views = +filterBy.byViews
    if (filterBy.byCreatedAt) sortCriteria.createdAt = +filterBy.byCreatedAt
    if (filterBy.byName) sortCriteria.name = +filterBy.byName
    if (filterBy.limit) limit = +filterBy.limit
    if (filterBy.tranding) filterCriteria.tranding = filterBy.tranding

    // console.log('item service sortCriteria:', sortCriteria);
    // console.log('item service filterCriteria:', filterCriteria);


    const collection = await dbService.getCollection(COLLECTION)
    try {
        if (filterCriteria.tranding === 'true') {
            const items = await collection.find({views: {$gt: +filterBy.gt}}).sort(sortCriteria).limit(limit).toArray();
            return items
        } else {
            const items = await collection.find(filterCriteria).sort(sortCriteria).limit(limit).toArray();            
            return items
        }
    } catch (err) {
        console.log('ERROR: cannot find items')
        throw err;
    }
}

async function getById(itemId) {
    const collection = await dbService.getCollection(COLLECTION)
    try {
        const item = await collection.findOne({"_id": ObjectId(itemId)})
        return item
    } catch (err) {
        console.log(`ERROR: while finding user ${itemId}`)
        throw err;
    }
}

async function remove(itemId) {
    const collection = await dbService.getCollection(COLLECTION)
    try {
        await collection.deleteOne({
            "_id": ObjectId(itemId)
        })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${itemId}`)
        throw err;
    }
}

async function update(item) {
    // console.log('got to update#####');

    const collection = await dbService.getCollection(COLLECTION)
    try {
        console.log(item);

        const itemId = item._id
        delete item._id
        await collection.replaceOne({
            "_id": ObjectId(itemId)
        }, {
            $set: item
        })
        item._id = itemId
        return item
    } catch (err) {
        console.log(`ERROR: cannot update user ${itemId}`)
        throw err;
    }
}

async function add(item) {
    console.log('got to add*****');

    const collection = await dbService.getCollection(COLLECTION)
    try {
        await collection.insertOne(item);
        return item;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}