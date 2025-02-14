const express = require("express");
const UserController = require("../controllers/user.controller");
const { upload } = require("../middlewares/uploadForMulter");

const userRouter = express.Router();

userRouter.get("/", UserController.getAllUser);
userRouter.post('/register',upload.single('avatar'), UserController.registerUser)
userRouter.post('/login', UserController.logIn)
userRouter.get("/user", UserController.getUserData);
userRouter.post("/forgot-password", UserController.forgotPassword);
userRouter.post("/reset-password", UserController.resetPassword);

module.exports = userRouter