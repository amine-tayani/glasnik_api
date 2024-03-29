const cloudinary = require('cloudinary')
const config = require('../../config/_conf')

const uploadFile = async (file) => {
  try {
    const { createReadStream } = await file
    const fileStream = createReadStream()

    // init cloudinary
    cloudinary.v2.config({
      cloud_name: config.CLOUDINARY_NAME,
      api_key: config.CLOUDINARY_API_KEY,
      api_secret: config.CLOUDINARY_API_SECRET,
    })

    return new Promise((resolve, reject) => {
      const cloudStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: config.CLOUDINARY_MEDIA_FOLDER,
        },
        (err, fileUploaded) => {
          if (err) reject(err)
          resolve(fileUploaded)
        },
      )
      fileStream.pipe(cloudStream)
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { uploadFile }
