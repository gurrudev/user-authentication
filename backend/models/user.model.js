const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        avatar: {
            type: Buffer,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("Users", userSchema);
module.exports = User;
