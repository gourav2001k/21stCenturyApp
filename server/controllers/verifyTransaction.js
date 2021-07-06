const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const generateCheckSum = require("../utils/generateCheckSum");

exports.verify = async (req, res, next) => {
  try {
    const { orderID } = req.query;
    var paytmParams = {};

    paytmParams.body = {
      mid: process.env.MID,
      orderId: orderID,
    };

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
      `https://securegw-stage.paytm.in//v3/order/status`,
      paytmParams,
      axiosConfig
    );
    console.log(resp.data);
    res.status(200).json(resp.data);
  } catch (err) {
    res.status(400).json({ error: true });
  }
};
