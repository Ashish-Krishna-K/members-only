import 'dotenv/config.js';
import createHttpError, { HttpError } from 'http-errors';
import express, { type Request, type Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import indexRouter from './routes/index.js';
import messagesRouter from './routes/messages.js';
import usersRouter from './routes/users.js';
import { authenticateUser, deserializeFunction } from './controllers/usersController.js';

// declaration merging to ensure typescript knows about the id
// property in the session(which is added by passport)
declare global {
  namespace Express {
    interface User {
      id?: string;
    }
  }
}

const app = express();

mongoose.set('strictQuery', false);

async function connectToDb() {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
    } else {
      throw new Error('A URI to the database is not found. Please add a URI to the MONGODB_URI environment variable');
    }
  } catch (error) {
    console.error(error);
  }
}

connectToDb();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: process.env.SESSION_SECRET!, resave: false, saveUninitialized: true }));
passport.use(
  new LocalStrategy(
    {
      // By default, passport assumes the username field will be called as "username"
      // but in this case we're using email field for username input hence declaring the
      // correct field name for username field.
      usernameField: 'email',
    },
    authenticateUser,
  ),
);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(deserializeFunction);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  // setting the req.user(which is set by passport on authenticating) to the req.locals 
  // object so it can be accessed by the views files
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/messages', messagesRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
