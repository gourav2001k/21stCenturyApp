const adminSDK = require("./adminSDK");

const customNotify = async (token, title, body) => {
  try {
    await adminSDK.messaging().sendToDevice(
      [token],
      {
        notification: {
          title,
          body,
        },
        data: {
          message: body,
          title: title,
        },
      },
      {
        contentAvailable: true,
        priority: "high",
      }
    );
    console.log("done");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = customNotify;
