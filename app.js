const express = require('express');
const dotenv = require('dotenv');
dotenv.config({
    path: './config/config.env',
});
const connectDB = require('./db/db');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
require('./config/passport')(passport);

// set app
const app = express();

// bodyparser
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(express.json());

// passport
app.use(passport.initialize());
app.use(passport.session());

// database
connectDB();


app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));


// set port
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server Is Running on LocalHost:${PORT}`);
});
// server error
process.on('unhandledRejection', (err, promise) => {
    if (err) {
        server.close();
        process.exit(1);
    }
});