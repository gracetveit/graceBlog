import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization || '';
    const secret = process.env.SECRET || '';
    const password = process.env.PASSWORD || '';
    const test = jwt.verify(token, secret);
    if (test === password) {
      next();
    } else {
      throw new Error('Unauthorized');
    }
  } catch (error) {
    next(error);
  }
};

export const generateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const enteredPassword: string = req.body;
    const secret = process.env.SECRET || '';
    const password = process.env.PASSWORD || '';
    if (enteredPassword === password) {
      const token = jwt.sign(password, secret);
      res.send(token);
    } else {
      throw new Error('Incorrect Password');
    }
  } catch (error) {
    next(error);
  }
};
