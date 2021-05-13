const express = require("express");
const router = express.Router();
const handler = require("../handlers/dataHandler.model");

router.get("/getUserPolicies", handler.getUserPolicyAggregated);
router.get("/getUserPolicyByName", handler.getUserPolicyByName);

module.exports = router;