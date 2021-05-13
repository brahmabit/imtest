const util = require("util");
const multer = require("multer");
const maxSize = 5 * 1024 * 1024;
var randomize = require('randomatic');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/assets/uploads/");
  },
  filename: (req, file, cb) => {
      //console.log(req.headers, req.body)
    cb(null, req.headers.filename);
  },
  /*(req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },*/
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;