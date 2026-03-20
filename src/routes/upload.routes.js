const express = require('express');
const router = express.Router();


const uploadController = require('../controllers/upload.controller'); 
const rateLimiter = require('../middleware/rateLimiter');
const fileValidator = require('../middleware/fileValidator');


const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage });

router.post(
    '/',
    rateLimiter,
    upload.single('file'),
    fileValidator,
    uploadController.handleUpload
);

module.exports = router
