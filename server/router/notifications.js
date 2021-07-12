const express = require("express");

const sendNotification = require("../controllers/sendNotification");
const notifyAll = require("../controllers/notifyAll");

const router = express.Router();

router.post("/notification", sendNotification.send);
router.post("/notifyAll", notifyAll.notify);

module.exports = router;
