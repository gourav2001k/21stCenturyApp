const adminSDK = require("./adminSDK");

const calculateAmount = async (uid) => {
  try {
    const user = await adminSDK.firestore().collection("users").doc(uid).get();
    const cart = user.data().cart;
    var amount = 0;
    for (const mealID in cart) {
      amount += cart[mealID].price * cart[mealID].quantity;
    }
    // incorporating Taxes
    amount *= 1.05;
    return amount;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = calculateAmount;
