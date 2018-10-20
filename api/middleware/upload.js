const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./uploads/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}_${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === `image/png` || file.mimetype === `image/jpeg`) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024*1024*2 // Limit size of files to 2MB
  },
  fileFilter: fileFilter
});