const uploadService = require('./upload.service')

async function uploadImg(req, res){
    const img = await uploadService.add(req.body)
}

module.exports = {
    uploadImg,
}