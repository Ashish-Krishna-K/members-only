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

router.get('/signup', getSignup);

router.post('/signup', postSignup);

router.get('/login', getLogin);

router.post('/login', postLogin);

router.get('/logout', getLogout);

router.post('/logout', postLogout);

router.get('/membersignup', getMembershipSignup);

router.post('/membersignup', postMembershipSignup);

router.get('/adminsignup', getAdminSignup);

router.post('/adminsignup', postAdminSignup);

export default router;
