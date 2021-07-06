const express = require("express");

const startTransaction = require("../controllers/startTransaction");
const verifyTransaction = require("../controllers/verifyTransaction");
const router = express.Router();

router.get("/startTransaction", startTransaction.start);
router.get("/verifyTransaction", verifyTransaction.verify);

module.exports = router;
