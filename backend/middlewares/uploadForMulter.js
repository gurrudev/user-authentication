const multer = require("multer");

const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter(req, file, cb) {
        if (!file.mimetype.match(/^image\/(jpeg|png|jpg)$/)) {
            return cb(new Error("Please upload an image (JPG, PNG, JPEG)"));
        }
        cb(null, true);
    },
});

module.exports = { upload };