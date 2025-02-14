const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    JWT_SECRET_KEY,
    JWT_USER_LOGIN_EXPIRY,
    JWT_PASSWORD_RESET_TOKEN_EXPIRY,
    MAILER_EMAIL,
    MAILER_PASSWORD,
    FRONTEND_URL,
} = require("../config/env");
const nodemailer = require("nodemailer");
const sharp = require("sharp");

module.exports = class UserController {
    static getAllUser = async (req, res, next) => {
        let users;
        try {
            users = await User.find();
        } catch (err) {
            console.log(err);
        }
        if (!users) {
            return res.status(401).json({ message: "No users found" });
        }
        users = users.map((user) => {
            const userObj = user.toObject();
            delete userObj.password;
            return userObj;
        });
        return res.status(200).json({ users });
    };

    // static registerUser = async (req, res, next) => {
    //     const { firstName, lastName, gender, email, password } = req.body;
    //     let existingEmail;
    //     try {
    //         existingEmail = await User.findOne({ email });
    //     } catch (err) {
    //         return console.error(err);
    //     }
    //     if (existingEmail) {
    //         return res.status(201).json({ message: "Email already exists!" });
    //     }
    //     const hashedPassword = bcrypt.hashSync(password);
    //     const user = new User({
    //         firstName,
    //         lastName,
    //         gender,
    //         email,
    //         password: hashedPassword,
    //     });
    //     try {
    //         await user.save();
    //     } catch (err) {
    //         console.log(err);
    //     }
    //     return res.status(200).json({ user });
    // };

    static registerUser = async (req, res) => {
        try {
            const { firstName, lastName, gender, email, password } = req.body;
            const avatar = req.file; // Get uploaded image

            let existingEmail;
            try {
                existingEmail = await User.findOne({ email });
            } catch (err) {
                return console.error(err);
            }
            if (existingEmail) {
                return res
                    .status(201)
                    .json({ message: "Email already exists!" });
            }
            if (!avatar) {
                return res.status(400).json({ message: "Avatar is required!" });
            }

            // Resize image to 200x200
            // Resize the image buffer
            const resizedAvatarBuffer = await sharp(avatar.buffer)
                .resize(200, 200)
                .toBuffer()

            const hashedPassword = bcrypt.hashSync(password, 10); // Ensure salt rounds are passed
            const user = new User({
                firstName,
                lastName,
                gender,
                email,
                password: hashedPassword,
                avatar: resizedAvatarBuffer.toString("base64"),
            });

            await user.save();
            return res
                .status(201)
                .json({ message: "User registered successfully", user });
        } catch (error) {
            res.status(500).json({ message: "Error registering user" });
        }
    };

    static logIn = async (req, res, next) => {
        const { email, password } = req.body;
        let existingUser;
        try {
            existingUser = await User.findOne({ email });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error" });
        }
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordCorrect = bcrypt.compareSync(
            password,
            existingUser.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }
        // Generate a token
        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET_KEY, {
            expiresIn: JWT_USER_LOGIN_EXPIRY,
        });
        console.log(JWT_USER_LOGIN_EXPIRY);
        return res.status(200).json({ message: "login successful!", token });
    };

    static getUserData = async (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        try {
            const decodedToken = jwt.verify(
                token.split(" ")[1],
                JWT_SECRET_KEY
            );
            const userId = decodedToken.userId;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const userDataToSend = { ...user._doc };
            delete userDataToSend.password;

            userDataToSend.avatar = `data:image/png;base64,${userDataToSend.avatar}`;

            return res.status(200).json({ user: userDataToSend });
        } catch (error) {
            console.error(error); // Log the error for debugging
            return res.status(498).json({ message: "Invalid token" });
        }
    };

    static forgotPassword = async (req, res) => {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            // Generate a reset token valid for 1 hour
            const resetToken = jwt.sign({ email }, JWT_SECRET_KEY, {
                expiresIn: JWT_PASSWORD_RESET_TOKEN_EXPIRY,
            });
            // Create email transport
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: MAILER_EMAIL,
                    pass: MAILER_PASSWORD,
                },
            });
            // Send email with reset link (token in URL)
            const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;
            const mailOptions = {
                from: MAILER_EMAIL,
                to: email,
                subject: "Password Reset",
                html: `
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                        <div style="background-color: #343a40; color: #fff; padding: 10px; border-radius: 10px 10px 0 0;">
                            <h2>Password Reset Request</h2>
                        </div>
                        <div style="padding: 20px;">
                            <p style="color: #555;">Hello,</p>
                            <p style="color: #555;">We received a request to reset your password. Click the button below to reset your password. This link will expire in 1 hour.</p>
                            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #127a45; text-decoration: none; border-radius: 5px;">Reset Password</a>
                            <p style="color: #555;">If you did not request this, please ignore this email. Your password will remain unchanged.</p>
                            <p style="color: #555;">Thank you,</p>
                            <p style="color: #555;">The Support Team</p>
                        </div>
                    </div>
                `,
            };
            await transporter.sendMail(mailOptions);
            return res
                .status(200)
                .json({ message: "Password reset link sent!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error" });
        }
    };

    static resetPassword = async (req, res) => {
        const { token, newPassword } = req.body;
        try {
            // Verify the token
            const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
            const user = await User.findOne({ email: decodedToken.email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            // Hash and update the password
            user.password = bcrypt.hashSync(newPassword);
            await user.save();
            return res
                .status(200)
                .json({ message: "Password reset successful!" });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                message: "Invalid token. Please request a new reset link.",
            });
        }
    };
};
