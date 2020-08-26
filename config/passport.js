const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv');
const passport = require('passport');
dotenv.config({
    path: './config.env'
});
const User = require('../db/models/User');
// const secret = require('./keys').SECRET;
module.exports = (passport) => {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.SECRET;

    passport.use(
        new JwtStrategy(opts, async(jwt_payload, done) => {
            // console.log(jwt_payload.id);
            try {
                const user = await User.findById(
                    jwt_payload.id
                );
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err, false)
            }

        })
    )
};