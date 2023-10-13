import { NextFunction, Request, Response } from 'express';
import Message from '../models/messageModels';
import { body, validationResult } from 'express-validator';

// Index controller for home page
export const getIndex = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allMessages = await Message.find().populate('createdBy', 'firstName lastName').exec();
    res.render('index', {
      title: 'Home',
      messages: allMessages,
    });
  } catch (error) {
    return next(error);
  }
};

// Add a new message - GET route controller
export const getCreateMessage = (req: Request, res: Response) => {
  // The user is not currently logged in, redirect to login page.
  if (typeof req.user === 'undefined') res.redirect('/users/login');
  res.render('messagesForm', {
    title: 'Add a message',
  });
};

// Add a new message - POST route controller
export const postCreateMessage = [
  body('title').trim().notEmpty().withMessage('Title is required').escape(),
  body('text').trim().notEmpty().withMessage('Text is required').escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    // The user is not currently logged in, redirect to login page.
    if (typeof req.user === 'undefined') res.redirect('/users/login');
    const errors = validationResult(req);
    const formData = {
      title: req.body.title,
      text: req.body.text,
    };
    if (!errors.isEmpty()) {
      // errors are present
      res.render('messagesForm', {
        title: 'Add a message',
        formData,
        errors: errors.array(),
      });
    } else {
      // no errors, update database
      try {
        const message = new Message({
          _title: formData.title,
          text: formData.text,
          createdBy: req.user?.id,
        });
        await message.save();
        res.redirect('/');
      } catch (error) {
        return next(error);
      }
    }
  },
];

// Delete a message - GET route controller
export const getDeleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await Message.findById(req.params.id).populate('createdBy', 'firstName lastName').exec();
    if (!message) {
      // message not found, nothing to delete, simply redirect user to home page.
      res.redirect('/');
    }
    res.render('messageDelete', {
      title: 'Delete Message',
      message,
    });
  } catch (error) {
    return next(error);
  }
};

// Delete a message - POST route controller
export const postDeleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Message.findByIdAndDelete(req.body.id).exec();
    // In case we were not able to find the message then there's nothing to delete.
    res.redirect('/');
  } catch (error) {
    return next(error);
  }
};
