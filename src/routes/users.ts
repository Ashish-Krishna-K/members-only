import express from 'express';
import {
  getAdminSignup,
  getLogin,
  getLogout,
  getMembershipSignup,
  getSignup,
  postAdminSignup,
  postLogin,
  postLogout,
  postMembershipSignup,
  postSignup,
} from '../controllers/usersController';
const router = express.Router();

// GET - Signup route
router.get('/signup', getSignup);

// POST - Signup route
router.post('/signup', postSignup);

// GET - Login route
router.get('/login', getLogin);

// POST - Login route
router.post('/login', postLogin);

// GET - Logout route
router.get('/logout', getLogout);

// POST - Logout route
router.post('/logout', postLogout);

// GET - Membership signup route
router.get('/membersignup', getMembershipSignup);

// POST - Membership signup route
router.post('/membersignup', postMembershipSignup);

// GET - Admin signup route
router.get('/adminsignup', getAdminSignup);

// POST - Admin signup route
router.post('/adminsignup', postAdminSignup);

export default router;
