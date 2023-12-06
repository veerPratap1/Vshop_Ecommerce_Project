const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Product_img");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.fieldname;
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

exports.upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});
