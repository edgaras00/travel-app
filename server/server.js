const mongoose = require("mongoose");
require("dotenv").config({ path: `${__dirname}/.env` });

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught exception. Shutting down...");
  process.exit(1);
});

const app = require("./app");

const DB_CONN = process.env.DB_STRING.replace(
  "<password>",
  process.env.DB_PASSWORD
);

mongoose.connect(DB_CONN, () => {
  console.log("Connected to DB");
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection. Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
