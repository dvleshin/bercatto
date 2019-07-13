const uploadService = require('./upload.service')

async function uploadImg(req, res){
    console.log('req body from upload controller', req.body)    
    const img = await uploadService.add(req.body)
}

module.exports = {
    uploadImg,
}