'use strict'
import axios from 'axios'

export default {
    getCordsByName,
    makeId
}

async function getCordsByName(location) {

    const API_KEY = 'AIzaSyA4JtpFz0lT5idk1cUSYMVig1e6lkCaP88';
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`
    
    let cords = await axios.get(URL)
    return cords.data.results[0].geometry.location
}

function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}
