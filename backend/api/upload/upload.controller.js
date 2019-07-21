const uploadService = require('./upload.service')

async function uploadImg(req, res) {
    //console.log('req body from upload controller', req.files)
    let files = req.files
    console.log('upload controller:', files);
    
    const allImgs = await Promise.all(files.map(async file => {
         return await uploadService.add(file)
    }))
    res.send(allImgs)
}

module.exports = {
    uploadImg,
}