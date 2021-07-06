var admin = require("firebase-admin");
var serviceAccount = require("../centurybakerydev-firebase-adminsdk-q75q9-41b10f9ce9.json");
module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
