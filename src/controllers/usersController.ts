import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/userModels';
import { compare, hash } from 'bcryptjs';
import { VerifyFunction } from 'passport-local';
import passport, { DoneCallback } from 'passport';

declare module 'express-session' {
  export interface SessionData {
    messages: string[];
  }
}

export const deserializeFunction = async (id: string, done: DoneCallback) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
};

export const authenticateUser: VerifyFunction = async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) return done(null, false, { message: 'Email not found' });
    const matchPassword = await compare(password, user.hashedPassword);
    if (!matchPassword) return done(null, false, { message: 'Incorrect Password' });
    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

export const getSignup = (req: Request, res: Response) => {
  res.render('signupForm', {
    title: 'Sign up',
  });
};

export const postSignup = [
  body('firstName').trim().notEmpty().withMessage('First name is required').escape(),
  body('lastName').trim().notEmpty().withMessage('Last name is required').escape(),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be of format you@email.com')
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 characters long')
    .matches(/[a-z]+/g)
    .withMessage('Password must have atleast 1 lowercase character')
    .matches(/[A-Z]+/g)
    .withMessage('Password must have atleast 1 uppercase character')
    .matches(/[0-9]+/g)
    .withMessage('Password must have atleast 1 numerical digit')
    .matches(/[!@#$%^&*\-_+=|\\:;"'<,>.?/]+/g)
    .withMessage('Password must have atleast 1 special character')
    .escape(),
  body('confirmPassword')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 characters long')
    .matches(/[a-z]+/g)
    .withMessage('Password must have atleast 1 lowercase character')
    .matches(/[A-Z]+/g)
    .withMessage('Password must have atleast 1 uppercase character')
    .matches(/[0-9]+/g)
    .withMessage('Password must have atleast 1 numerical digit')
    .matches(/[!@#$%^&*\-_+=|\\:;"'<,>.?/]+/g)
    .withMessage('Password must have atleast 1 special character')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match')
    .escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const formData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };
    if (!errors.isEmpty()) {
      res.render('signupForm', {
        title: 'Sign up',
        formData,
        errors: errors.array(),
      });
    } else {
      try {
        const hashedPassword = await hash(formData.password, 16);
        const user = new User({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          hashedPassword,
        });
        await user.save();
        res.redirect('/');
      } catch (error) {
        return next(error);
      }
    }
  },
];

export const getLogin = (req: Request, res: Response) => {
  res.render('loginForm', {
    title: 'Login',
    errors: req.session.messages,
  });
};

export const postLogin = [
  body('email').trim().notEmpty().withMessage('Email is needed').escape(),
  body('password').trim().notEmpty().withMessage('Password is needed').escape(),
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureMessage: true,
  }),
];

export const getLogout = (req: Request, res: Response) => {
  res.render('logoutForm', {
    title: 'Logout',
  });
};

export const postLogout = async (req: Request, res: Response, next: NextFunction) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect('/');
  });
};

export const getMembershipSignup = (req: Request, res: Response) => {
  if (typeof req.user === 'undefined') res.redirect('/users/login');
  res.render('memberSignupForm', {
    title: 'Become a member',
  });
};

export const postMembershipSignup = [
  body('passphrase')
    .trim()
    .notEmpty()
    .withMessage('Passphrase is required.')
    .custom((input) => input === process.env.MEMBERSHIP_SECRET)
    .withMessage('Wrong passphrase!')
    .escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.user === 'undefined') res.redirect('/users/login');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('memberSignupForm', {
        title: 'Become a member',
        errors: errors.array(),
      });
    } else {
      try {
        const user = await User.findById(req.user?.id).exec();
        if (user) {
          user.isMember = true;
          await user.save();
        }
        res.redirect('/');
      } catch (error) {
        return next(error);
      }
    }
  },
];

export const getAdminSignup = (req: Request, res: Response) => {
  if (typeof req.user === 'undefined') res.redirect('/users/login');
  res.render('adminSignupForm', {
    title: 'Become Admin',
  });
};

export const postAdminSignup = [
  body('passphrase')
    .trim()
    .notEmpty()
    .withMessage('Passphrase is required.')
    .custom((input) => input === process.env.ADMIN_SECRET)
    .withMessage('Wrong passphrase!')
    .escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.user === 'undefined') res.redirect('/users/login');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('adminSignupForm', {
        title: 'Become Admin',
        errors: errors.array(),
      });
    } else {
      try {
        const user = await User.findById(req.user?.id).exec();
        if (user) {
          user.isMember = true;
          user.isAdmin = true;
          await user.save();
        }
        res.redirect('/');
      } catch (error) {
        return next(error);
      }
    }
  },
];
