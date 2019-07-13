const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../../config/cloudinary.json').cloudinary
const fsExtra = require('fs-extra')

const upload = multer({ dest: '../../uploads/' })
cloudinary.config(cloudinaryConfig)

module.exports = {
    add
}

async function add(img){
    console.log(img);
    
}