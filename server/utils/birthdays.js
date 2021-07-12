const schedule = require("node-schedule");
const adminSDK = require("./adminSDK");
const customNotify = require("./customNotify");

const Birthdays = schedule.scheduleJob("10 0 * * *", async () => {
  const users = await adminSDK.firestore().collection("users").get();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  users.docs.map((usr) => {
    var user = usr.data();
    if (user.DOB && user.token.length > 0) {
      if (
        user.DOB.toDate().getDate() === day &&
        user.DOB.toDate().getMonth() === month
      )
        customNotify(
          user.token,
          "🍰🎉 Happy Bithday 🍰🎉",
          "21st Century Bakery wishes you a very Happy Birthday. Come let's celebrate this moment together."
        );
    }
  });
});
module.exports = Birthdays;
