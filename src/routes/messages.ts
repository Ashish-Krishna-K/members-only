import express from 'express';
import {
  getCreateMessage,
  getDeleteMessage,
  getIndex,
  postCreateMessage,
  postDeleteMessage,
} from '../controllers/messagesController';
const router = express.Router();

router.get('/', getIndex);

router.get('/:id/delete', getDeleteMessage);

router.post('/:id/delete', postDeleteMessage);

router.get('/create', getCreateMessage);

router.post('/create', postCreateMessage);

export default router;
