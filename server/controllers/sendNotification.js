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
  // birthday messages

  //   if (admin) {
  // var sendMessageDataAdmin;
  // var adminTypeText;
  // if (adminType === "orderRecieved") {
  //   sendMessageDataAdmin = "Your have a new order!!!";
  // adminTypeText = "Order Recieved!!!";
  // } else if (adminType === "orderCanceled") {
  //   sendMessageDataAdmin = "User have canceled order!!";
  // adminTypeText = "Order Canceled!!!";
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
      notification: {
        title: type,
        body: sendMessageDataUser,
      },
      data: {
        message: sendMessageDataUser,
        title: type,
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
      error: err,
    });
  }
};
