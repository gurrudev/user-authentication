const express = require("express");
const cors = require("cors");
const { MONGO_CRED } = require("./config/env");
const { dbConnect } = require("./config/dbConfig");
const userRouter = require("./router/user.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect(MONGO_CRED);

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.status(200).send("App is live!🚀");
});
app.all("*", (req, res) => {
    res.status(404).json({ message: "Page not found!" });
});

module.exports = { app };
