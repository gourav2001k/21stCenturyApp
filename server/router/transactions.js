const express = require("express");

const startTransaction = require("../controllers/startTransaction");
const verifyTransaction = require("../controllers/verifyTransaction");
const sendNotification = require("../controllers/sendNotification");
const router = express.Router();

router.get("/startTransaction", startTransaction.start);
router.get("/verifyTransaction", verifyTransaction.verify);
router.post("/notification", sendNotification.send);

module.exports = router;
