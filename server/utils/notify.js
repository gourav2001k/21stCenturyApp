const adminSDK = require("./adminSDK");
const customNotify = require("./customNotify");

const notify = async (uid, type, sendMessageDataUser) => {
  try {
    const user = await adminSDK.firestore().collection("users").doc(uid).get();
    const messageToken = user.data().token;
    if (messageToken === "") throw new Error("Message Token is empty!!!");
    await customNotify(messageToken, type, sendMessageDataUser);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = notify;
