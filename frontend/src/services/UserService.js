'use strict'

export default {
    query,
    save,
    remove,
    getById,
}

let users = [
{
    "_id": "u102",
    "userName": "orly@amdadi.com",
    "fullName": "Orly Amdadi",
    "password": "tinkerbell",
    "isAdmin": false,
    "reviews" : [{
    "fromUser": "u123",
    "createdAt": 13468129,
    "txt": "very bad seller",
     "rate" : 5
     }],
    "items": [{itemId:"i333", name:"Laptop"},{itemId:"i222", name:"Mouse"}],
     "adress" : {city:"Jerusalem", country:"Israel"}
},
{
    "_id": "u101",
    "userName": "orly@amdadi.com",
    "fullName": "Orly Amdadi",
    "password": "tinkerbell",
    "isAdmin": true,
    "reviews" : [{
    "fromUser": "u123",
    "createdAt": 13468129,
    "txt": "very bad seller",
     "rate" : 5
     }],
    "items": [{itemId:"i444", name:"xbox"}],
     "adress" : {city:"Jerusalem", country:"Israel"}
}]

function query() {
    return Promise.resolve(users)
}


function remove(userId) {
  return Promise.resolve(17)
}

function getById(userId) {
    const user = users.find(user=>user._id===userId)
    return Promise.resolve(user)
}

function save(user) {
    return Promise.resolve(17)
}