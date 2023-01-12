const Message = require('../models/message');
const User = require('../models/user');
const { body, validationResult } = require("express-validator");

exports.message_list = (req, res, next) => {
  Message.find({})
    .sort({ time_stamp: -1 })
    .populate("author")
    .exec((err, list_messages) => {
      console.log(list_messages);
      if (err) {
        return next(err);
      }
      res.render("index", {
        title: "Home",
        message_list: list_messages,
      });
    });
};

exports.create_message_form_get = (req, res, next) => {
  res.render("create_message", { title: "Add Message" });
};

exports.create_message_form_post = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title is required")
    .escape(),
  body("message_body")
    .trim()
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("create_message", {
        title: "Add Message",
        message: req.body,
        errors: errors.array(),
      });
      return;
    }
    const newMsg = new Message({
      title: req.body.title,
      message: req.body.message_body,
      time_stamp: Date.now(),
      author: req.body.author,
    });
    newMsg.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    })
  }
]

exports.delete_message_form_get = (req, res, next) => {
  res.send('not yet implemented');
};

exports.delete_message_form_post = (req, res, next) => {
  res.send('not yet implemented');
};