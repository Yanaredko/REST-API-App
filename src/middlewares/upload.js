const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();
    if (extname !== '.jpg' && extname !== '.jpeg' && extname !== '.png') {
      return cb(new Error('Invalid file type. Only JPEG or PNG files are allowed.'));
    }
    cb(null, true);
  },
});

module.exports = upload;