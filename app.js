const express = require("express");
require('dotenv').config();
const createError = require("http-errors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");

const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const port = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRouter');
const messageRouter = require('./routes/messageRouter');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "mugiwara", resave: false, saveUninitialized: true }));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.listen(port)