const mongoose = require("mongoose");

const app = require("./app");

require("dotenv").config({ path: `${__dirname}/.env` });

const DB_CONN = process.env.DB_STRING.replace(
  "<password>",
  process.env.DB_PASSWORD
);

mongoose.connect(DB_CONN, () => {
  console.log("Connected to DB");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
