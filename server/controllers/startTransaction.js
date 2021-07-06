const axios = require("axios");
const dotenv = require("dotenv");
const calculateAmount = require("../utils/calcaluteAmount");
dotenv.config();

const generateCheckSum = require("../utils/generateCheckSum");
const verifyToken = require("../utils/verifyToken");

exports.start = async (req, res, next) => {
  try {
    const { orderID, token } = req.query;
    const uid = await verifyToken(token);
    if (uid === false) throw new Error("Invalid Token");
    const amount = await calculateAmount(uid);

    var paytmParams = {};
    paytmParams["body"] = {
      requestType: "Payment",
      mid: process.env.MID,
      websiteName: "WEBSTAGING",
      orderId: orderID,
      callbackUrl: `https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=${orderID}`,
      txnAmount: {
        value: amount.toString(),
        currency: "INR",
      },
      userInfo: {
        custId: uid,
      },
    };

    const checkSum = await generateCheckSum(paytmParams.body);

    paytmParams["head"] = {
      signature: checkSum,
    };
    var axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(paytmParams).length,
      },
    };
    const resp = await axios.post(
      `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${process.env.MID}&orderId=${orderID}`,
      paytmParams,
      axiosConfig
    );
    res.status(200).json(resp.data);
  } catch (err) {
    res.status(400).json({ error: true });
  }
};
