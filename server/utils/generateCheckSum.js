const Paytm = require("paytmchecksum");
const dotenv = require("dotenv");
dotenv.config();

const generateCheckSum = async (body) => {
  try {
    const checkSum = await Paytm.generateSignature(
      JSON.stringify(body),
      process.env.M_KEY
    );
    return checkSum;
  } catch (err) {
    return err;
  }
};

module.exports = generateCheckSum;
