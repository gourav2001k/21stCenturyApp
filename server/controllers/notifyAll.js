const adminSDK = require("../utils/adminSDK");
const customNotify = require("../utils/customNotify");
const verifyToken = require("../utils/verifyToken");

exports.notify = async (req, res, next) => {
  try {
    const { token, title, message } = req.body;

    const uid = await verifyToken(token);
    if (uid === false) throw new Error("Invalid Token");
    const admin = await adminSDK.auth().getUser(uid);
    if (!process.env.ADMIN_PHONES.includes(admin.phoneNumber))
      throw new Error("Access Denied");

    const users = await adminSDK.firestore().collection("users").get();
    users.docs.map((usr) => {
      var user = usr.data();
      if (user.token.length > 0) {
        customNotify(user.token, title, message);
      }
    });
    res.status(200).json({
      message: "done",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
