
const MongoClient = require('mongodb').MongoClient;

const config  =  require('../config')

// Database Name
const dbName = 'barcatto_db';

var dbConn = null;

async function connect() {
    if (dbConn) return Promise.resolve(dbConn);

    // if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL, {
            useNewUrlParser: true
        });

        gClient = client;
        const db = client.db(dbName);
        dbConn = db;

        // process.on('SIGINT', closeDataBaseConnectionAndExit);
        // process.on('SIGTERM', closeDataBaseConnectionAndExit);

        client.on('close', () => {
            console.log('MongoDB Disconnected');
            client.close()
            dbConn = null;            
        })

        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}

async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

module.exports = {
    connect,
    getCollection
}