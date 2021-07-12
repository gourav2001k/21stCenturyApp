const adminsdk = require("../utils/adminSDK");
const notify = require("../utils/notify");
const verifyToken = require("../utils/verifyToken");

exports.send = async (req, res, next) => {
  try {
    const { token, type, admin, adminType } = req.body;

    const uid = await verifyToken(token);
    if (uid === false) throw new Error("Invalid Token");

    var sendMessageDataUser;
    var userTypeText;
    if (type === "orderPlaced") {
      sendMessageDataUser = "Your Order Placed Successfully";
      userTypeText = "Order Placed!!";
    } else if (type === "orderCanceled") {
      sendMessageDataUser = "Your Order has been Canceled";
      userTypeText = "Order Canceled!!";
    } else if (type === "orderAccepted") {
      sendMessageDataUser = "Your Order has been accepted ";
      userTypeText = "Order Accepted!!";
    } else if (type === "orderDelivered") {
      sendMessageDataUser = "Your Order has been delievered ";
      userTypeText = "Order Delievered!!";
    } else if (type === "orderTakeAway") {
      sendMessageDataUser = "You have picked your order ";
      userTypeText = "Order Taken!!";
    }

    const notiStatus = await notify(uid, userTypeText, sendMessageDataUser);

    if (!notiStatus) throw new Error("Notification Not sent");

    res.status(200).json({
      message: "done",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
