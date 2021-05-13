const express = require("express");
const router = express.Router();
const handler = require("../handlers/scheduler.handler");

router.post("/addMessage", handler.addMessage);


module.exports = router;