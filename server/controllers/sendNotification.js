const adminsdk = require("../utils/adminSDK");
const notify = require("../utils/notify");
const verifyToken = require("../utils/verifyToken");

exports.send = async (req, res, next) => {
  try {
    const { to, token, title, message } = req.body;

    const uid = await verifyToken(token);
    if (uid === false) throw new Error("Invalid Token");
    const admin = await adminSDK.auth().getUser(uid);
    if (!process.env.ADMIN_PHONES.includes(admin.phoneNumber))
      throw new Error("Access Denied");
    const notiStatus = await notify(to, title, message);

    if (!notiStatus) throw new Error("Notification Not sent");

    res.status(200).json({
      message: "done",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
