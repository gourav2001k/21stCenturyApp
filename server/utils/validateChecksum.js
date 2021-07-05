const Paytm = require("paytmchecksum");
const dotenv = require("dotenv");
dotenv.config();

const validateCheckSum = async (orderID, checkSum) => {
  try {
    body = { mid: process.env.MID, orderId: orderID };
    const val = await Paytm.verifySignature(
      JSON.stringify(body),
      process.env.M_KEY,
      checkSum
    );
    return val ? true : false;
  } catch (err) {
    return false;
  }
};

module.exports = validateCheckSum;
