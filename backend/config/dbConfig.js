const mongoose = require("mongoose");

const dbConnect = (MONGO_CRED) => {
    mongoose
        .connect(
            `mongodb+srv://${MONGO_CRED}@cluster0.i028f.mongodb.net/user-authentication`
        )
        .then(() => {
            console.log("DB Connected :)");
        })
        .catch((e) => {
            console.log("DB Connection Error: ", e);
        });
};

module.exports = {dbConnect};
