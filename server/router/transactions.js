const express = require("express");

const startTransaction = require("../controllers/startTransaction");
const verifyTransaction = require("../controllers/verifyTransaction");
const refundTransaction = require("../controllers/refundTransaction");
const transactionStatus = require("../controllers/transactionStatus");

const router = express.Router();

router.get("/startTransaction", startTransaction.start);
router.get("/verifyTransaction", verifyTransaction.verify);
router.get("/refundTransaction", refundTransaction.refund);
router.get("/transactionStatus", transactionStatus.status);

module.exports = router;
