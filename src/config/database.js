const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.URI;

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connect;
