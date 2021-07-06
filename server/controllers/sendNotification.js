const adminsdk = require("../utils/adminSDK");
const verifyToken = require("../utils/verifyToken");

exports.send = async (req, res, next) => {
  const { token, type, admin, adminType } = req.body;
  const uid = await verifyToken(token);
  if (uid === false) throw new Error("Invalid Token");

  const user = await adminsdk.firestore().collection("users").doc(uid).get();
  const messageToken = user.data().token;
  if (messageToken === "") throw new Error("Message Token is empty!!!");

  var sendMessageDataUser;
  if (type === "orderPlaced") {
    sendMessageDataUser = "Your Order Placed Successfully";
  } else if (type === "orderCanceled") {
    sendMessageDataUser = "Your Order has been Canceled";
  } else if (type === "orderAccepted") {
    sendMessageDataUser = "Your Order has been accepted ";
  } else if (type === "orderDelivered") {
    sendMessageDataUser = "Your Order has been delievered ";
  } else if (type === "orderTakeAway") {
    sendMessageDataUser = "You have picked your order ";
  }
  // birthday messages

  //   if (admin) {
  // var sendMessageDataAdmin;
  // if (adminType === "orderRecieved") {
  //   sendMessageDataAdmin = "Your have a new order!!!";
  // } else if (adminType === "orderCanceled") {
  //   sendMessageDataAdmin = "User have canceled order!!";
  // }
  //     adminsdk.messaging().sendToDevice(
  //       [], //add token for admin account
  //       {
  //         data: {
  //           her: "hell",
  //         },
  //       },
  //       {
  //         contentAvailable: true,
  //         priority: "high",
  //       }
  //     );
  //   }
  await adminsdk.messaging().sendToDevice(
    [messageToken],
    {
      data: {
        message: sendMessageDataUser,
      },
    },
    {
      contentAvailable: true,
      priority: "high",
    }
  );
  try {
    res.status(200).json({
      message: "done",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
