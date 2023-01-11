const Message = require('../models/message');

exports.message_list = (req, res, next) => {
  res.render("index");
};

exports.create_message_form_get = (req, res, next) => {
  res.send('not yet implemented');
};

exports.create_message_form_post = (req, res, next) => {
  res.send('not yet implemented');
};

exports.delete_message_form_get = (req, res, next) => {
  res.send('not yet implemented');
};

exports.delete_message_form_post = (req, res, next) => {
  res.send('not yet implemented');
};