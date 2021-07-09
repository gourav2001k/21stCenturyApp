const axios = require("axios");
const dotenv = require("dotenv");
const adminSDK = require("../utils/adminSDK");
dotenv.config();

const generateCheckSum = require("../utils/generateCheckSum");
const orderInfo = require("../utils/orderInfo");
const verifyToken = require("../utils/verifyToken");

exports.status = async (req, res, next) => {
  try {
    const { orderID, token, refund } = req.query;
    const uid = await verifyToken(token);
    if (uid === false) throw new Error("Invalid Token");

    const order = await orderInfo(orderID);
    if (order === false) throw new Error("Order doesn't exist");
    if (order.userID !== uid) {
      const admin = await adminSDK.auth().getUser(uid);
      if (!process.env.ADMIN_PHONES.includes(admin.phoneNumber))
        throw new Error("Access Denied");
    }
    var paytmParams = {};
    paytmParams.body = {
      mid: process.env.MID,
      orderId: orderID,
    };

    if (refund)
      paytmParams.body["refId"] = orderID.split("").reverse().join("");
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
    if (refund) {
      const resp = await axios.post(
        `https://securegw-stage.paytm.in/v2/refund/status`,
        paytmParams,
        axiosConfig
      );
      adminSDK
        .firestore()
        .collection("orders")
        .doc(orderID)
        .update({ refund: resp.data.body });
      res.status(200).json(resp.data.body);
    } else {
      const resp = await axios.post(
        `https://securegw-stage.paytm.in/v3/order/status`,
        paytmParams,
        axiosConfig
      );
      res.status(200).json(resp.data.body);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: true });
  }
};
