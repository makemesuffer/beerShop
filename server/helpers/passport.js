const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");

const User = mongoose.model("Users");
const keys = require("../config");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey; // secret

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id).then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};
