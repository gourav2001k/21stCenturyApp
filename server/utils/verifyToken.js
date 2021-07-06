const adminSDK = require("./adminSDK");

const verifyToken = async (idToken) => {
  try {
    const decodedToken = await adminSDK.auth().verifyIdToken(idToken);
    return decodedToken.uid;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = verifyToken;
