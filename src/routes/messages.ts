import express from 'express';
import {
  getCreateMessage,
  getDeleteMessage,
  getIndex,
  postCreateMessage,
  postDeleteMessage,
} from '../controllers/messagesController';
const router = express.Router();

// GET Home page
router.get('/', getIndex);

// GET delete message route
router.get('/:id/delete', getDeleteMessage);

// POST delete message route
router.post('/:id/delete', postDeleteMessage);

// GET create message route
router.get('/create', getCreateMessage);

// POST create message route
router.post('/create', postCreateMessage);

export default router;
