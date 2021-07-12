const axios = require("axios");
const dotenv = require("dotenv");
const adminSDK = require("../utils/adminSDK");
const findAdmins = require("../utils/findAdmins");
dotenv.config();

const generateCheckSum = require("../utils/generateCheckSum");
const notify = require("../utils/notify");
const orderInfo = require("../utils/orderInfo");
const verifyToken = require("../utils/verifyToken");

exports.refund = async (req, res, next) => {
  try {
    const { orderID, amount, token } = req.query;
    let isAdmin = false;
    const uid = await verifyToken(token);
    if (uid === false) throw new Error("Invalid Token");
    const order = await orderInfo(orderID);
    if (order === false) throw new Error("Order doesn't exist");
    if (order.userID === uid) {
      if (order.accepted === true) {
        throw new Error("Order Already Accepted");
      }
    } else {
      const admin = await adminSDK.auth().getUser(uid);
      if (!process.env.ADMIN_PHONES.includes(admin.phoneNumber))
        throw new Error("Access Denied");
      isAdmin = true;
    }
    var paytmParams = {};

    paytmParams.body = {
      mid: process.env.MID,
      orderId: orderID,
      txnType: "REFUND",
      txnId: order.payment.TXNID,
      refId: orderID.split("").reverse().join(""),
      refundAmount: order.payment.TXNAMOUNT,
    };
    // If we have got a custom refund amount
    if (amount && parseFloat(amount) < parseFloat(order.payment.TXNAMOUNT))
      paytmParams.body.refundAmount = amount;
    const checkSum = await generateCheckSum(paytmParams.body);

    paytmParams.head = {
      signature: checkSum,
    };
    var axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(paytmParams).length,
      },
    };
    const resp = await axios.post(
      `https://securegw-stage.paytm.in/refund/apply`,
      paytmParams,
      axiosConfig
    );
    await adminSDK
      .firestore()
      .collection("orders")
      .doc(orderID)
      .update({ refund: resp.data.body, isCancel: true });
    if (isAdmin) {
      notify(
        order.userID,
        "Order Cancelled",
        "We regret to inform you. Your Order was cancelled by Admin. Refund is initiated"
      );
    } else {
      notify(
        uid,
        "Order Cancelled",
        "Your Order was Cancelled Successfully and refund Initiated."
      );
    }

    findAdmins()
      .then((res) => {
        if (res !== false)
          res.map((uIDs) =>
            notify(
              uIDs,
              "Order Cancelled",
              `Order with orderID ${orderID} was cancelled.`
            )
          );
      })
      .catch((err) => console.log(err));
    res.status(200).json(resp.data.body);
  } catch (err) {
    res.status(400).json({ error: true });
  }
};
