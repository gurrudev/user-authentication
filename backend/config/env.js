require("dotenv").config();

// MongoDB Configuration
const MONGO_CRED = process.env.MONGO_CRED;

// JWT Configuration
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; 
const JWT_USER_LOGIN_EXPIRY = process.env.JWT_USER_LOGIN_EXPIRY; 
const JWT_PASSWORD_RESET_TOKEN_EXPIRY =
    process.env.JWT_PASSWORD_RESET_TOKEN_EXPIRY; 

// Email Configuration
const MAILER_EMAIL = process.env.MAILER_EMAIL;
const MAILER_PASSWORD = process.env.MAILER_PASSWORD;

// Frontend Configuration
const FRONTEND_URL = process.env.FRONTEND_URL;

module.exports = {
    MONGO_CRED,
    JWT_SECRET_KEY,
    JWT_USER_LOGIN_EXPIRY,
    JWT_PASSWORD_RESET_TOKEN_EXPIRY,
    MAILER_EMAIL,
    MAILER_PASSWORD,
    FRONTEND_URL,
};
