const express = require("express");

const orderController = require("../controllers/order");
const callbackController = require("../controllers/callBack");
const router = express.Router();

router.get("/order", orderController.getOrders);
router.post("/callback", callbackController.callback);

module.exports = router;
