const express = require("express");
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/user');

passport.use(new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      };
      if (!user) {
        return done(null, false, { message: "Incorrect Email Id" });
      };
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return done(err);
        }
        if (!result) {
          return done(null, false, { message: "Incorrect Password" })
        }
        return done(null, user);
      });
    })
  }
)
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

const user_controller = require('../controllers/userController');

router.get("/signup", user_controller.signup_form_get);

router.post("/signup", user_controller.signup_form_post);

router.get("/login", user_controller.login_form_get);

router.post("/login",
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login'
  }),
);

router.get("/logout", (req, res, next) => {
  console.log("here");
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  })
});

router.get('/join-club', user_controller.join_club_form_get);

router.post('/join-club', user_controller.join_club_form_post);

router.get('/admin/:id', user_controller.user_list);

router.get('/:id/make-admin', user_controller.make_admin);

router.get('/:id/remove-admin', user_controller.remove_admin);

module.exports = router;
