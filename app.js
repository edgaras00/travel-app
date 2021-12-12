const express = require("express");
const destinationRouter = require("./api/routes/destinationsRouter");
const userRouter = require("./api/routes/userRouter");

const app = express();

app.use("/api/destinations", destinationRouter);
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
