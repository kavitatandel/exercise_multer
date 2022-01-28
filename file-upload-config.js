const path = require('path');
const multer = require('multer');

const publicFolder = path.join(__dirname, 'public');
const uploadFolder = path.join(publicFolder, 'uploads');

const isPicture = (name, mimetype) => {
    return (
        name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/) &&
        mimetype == "image/png" || mimetype == "image/jpg" || mimetype == "image/jpeg" || mimetype == "image/gif"
    )
}

const fileFilter = (req, file, cb) => {
    // Accept image file types only
    const { originalname, mimetype } = file;
    if (!isPicture(originalname, mimetype)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb('Only image files are allowed!', false);
    }
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const uploadConfig = multer({ storage, fileFilter })

module.exports = uploadConfig