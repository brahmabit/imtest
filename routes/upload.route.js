const express = require("express");
const router = express.Router();
const handler = require("../handlers/uploadHandler.model");

router.post("/uploadFile", handler.uploadBasic);


module.exports = router;