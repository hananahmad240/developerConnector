const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
    path: '../config/config.env'
});
// const db = require('../config/keys').MONGOURI;
const connectDB = async() => {
    try {
        const connected = await mongoose.connect("mongodb+srv://hanan1:developer18nayyab@hanandeveloper-93jhi.mongodb.net/devconnector?retryWrites=true&w=majority", {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`mongodb is connected`);
    } catch (err) {
        console.log(`err`);
    }
}

module.exports = connectDB;