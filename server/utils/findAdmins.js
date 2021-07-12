const dotenv = require("dotenv");
const adminSDK = require("../utils/adminSDK");
dotenv.config();

const findAdmins = async () => {
  try {
    let adminUIDs = [];
    var phones = process.env.ADMIN_PHONES;
    var admins = [];
    var cur = "";
    for (var i = 0; i < phones.length; i++) {
      if (phones[i] === "[" || phones[i] === "]" || phones[i] === '"') continue;
      if (phones[i] === ",") {
        admins.push(cur);
        cur = "";
        continue;
      }
      cur = cur + phones[i];
    }
    if (cur.length) admins.push(cur);
    await Promise.all(
      admins.map(async (phone) => {
        const user = await adminSDK.auth().getUserByPhoneNumber(phone);
        adminUIDs.push(user.uid);
      })
    );
    return adminUIDs;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = findAdmins;
