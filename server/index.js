const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const transactionRoutes = require("./router/transactions");
const notificationRoutes = require("./router/notifications");
const Birthdays = require("./utils/birthdays");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("", notificationRoutes);
app.use("", transactionRoutes);

// Birthdays call
Birthdays;

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
