import { NextFunction, Request, Response } from 'express';

export const getIndex = async (req: Request, res: Response, next: NextFunction) => {
  res.send('Not yet implemented');
  next('error');
};

export const getCreateMessage = async (req: Request, res: Response, next: NextFunction) => {
  res.send('Not yet implemented');
  next('error');
};

export const postCreateMessage = async (req: Request, res: Response, next: NextFunction) => {
  res.send('Not yet implemented');
  next('error');
};

export const getDeleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  res.send('Not yet implemented');
  next('error');
};

export const postDeleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  res.send('Not yet implemented');
  next('error');
};
