const adminSDK = require("./adminSDK");

const orderInfo = async (orderID) => {
  try {
    var order = await adminSDK
      .firestore()
      .collection("orders")
      .doc(orderID)
      .get();
    order = order.data();
    return order;
  } catch (err) {
    return false;
  }
};
module.exports = orderInfo;
