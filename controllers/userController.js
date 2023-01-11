const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");
const User = require('../models/user');

exports.signup_form_get = (req, res, next) => {
  res.render("signup_form", { title: "Sign Up" });
};

exports.signup_form_post = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username is required")
    .escape(),
  body("email")
    .isLength({ min: 1 })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email should be of the format you@email.com")
    .normalizeEmail({ gmail_remove_dots: false })
    .custom(value => {
      User.find({ email: value })
        .exec((err, user) => {
          if (err) {
            return err;
          };
          if (user) {
            return "Email already in use"
          };
        });
      return true;
    }),
  body("password")
    .isLength({ min: 1 })
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    })
    .withMessage("Password must contain one number, one Uppecase, one Lowercase and one Symbol"),
  body("confirm_password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match")
      }
      return true
    })
    .withMessage('Passwords do not match'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.render("signup_form", {
        title: "Sign Up",
        user: req.body,
        errors: errors.array(),
      });
      return;
    };
    bcrypt.hash(req.body.password, 16, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          joined_on: Date.now(),
          is_member: false,
          is_admin: false,
        });
        newUser.save((err) => {
          if (err) {
            next(err);
          } else {
            res.redirect('/');
          };
        });
      };
    });
  }
];

exports.login_form_get = (req, res, next) => {
  res.render("login_form", { title: "Login" })
};

exports.join_club_form_get = (req, res, next) => {
  res.send('not yet implemented');
};

exports.join_club_form_post = (req, res, next) => {
  res.send('not yet implemented');
};

exports.user_list = (req, res, next) => {
  res.send('not yet implemented');
};
