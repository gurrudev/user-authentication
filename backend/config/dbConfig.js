const mongoose = require("mongoose");

const dbConnect = (MONGO_URI) => {
    mongoose
        .connect(MONGO_URI)
        .then(() => {
            console.log("DB Connected :)");
        })
        .catch((e) => {
            console.log("DB Connection Error: ", e);
        });
};

module.exports = {dbConnect};
