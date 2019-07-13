const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../../config/cloudinary.json').cloudinary

cloudinary.config(cloudinaryConfig)

module.exports = {
    add
}

async function add(file) {
    return await cloudinary.uploader.upload(file.path,
        async function (error, result) {
            return await result;            
        });

}