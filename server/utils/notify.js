const adminSDK = require("./adminSDK");

const notify = async (uid, type, sendMessageDataUser) => {
  try {
    const user = await adminSDK.firestore().collection("users").doc(uid).get();
    const messageToken = user.data().token;
    if (messageToken === "") throw new Error("Message Token is empty!!!");
    await adminSDK.messaging().sendToDevice(
      [messageToken],
      {
        notification: {
          title: type,
          body: sendMessageDataUser,
        },
        data: {
          message: sendMessageDataUser,
          title: type,
        },
      },
      {
        contentAvailable: true,
        priority: "high",
      }
    );
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = notify;
