import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { verifyEnvironemntVariable } from '../../lib';
import prisma from '../../prisma/client';
import * as argon2 from 'argon2';
import nodemailer from 'nodemailer';

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
    const enteredPassword: string = req.body.password;
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

// Create or Update user
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findFirst();
    let email: string;
    let token: string;
    const secret = verifyEnvironemntVariable(process.env.SECRET, 'SECRET');
    if (user) {
      email = user.email;
      token = jwt.sign(user, secret, { expiresIn: '1h' });
      await prisma.user.update({ where: { id: user.id }, data: { token } });
    } else {
      email = verifyEnvironemntVariable(process.env.EMAIL, 'EMAIL');
      token = jwt.sign({ email }, secret, { expiresIn: '1h' });
    }
    const serviceEmail = verifyEnvironemntVariable(process.env.EMAIL, 'EMAIL');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: serviceEmail,
        pass: verifyEnvironemntVariable(process.env.EMAILPW, 'EMAILPW'),
      },
    });
    await transporter.sendMail({
      from: serviceEmail,
      to: email,
      subject: 'Resetting your blog password',
      text: `Password reset request received.\nPlease use the following token: (${token}) to reset your password`,
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const upsert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token: unverifiedToken, username, password, email } = req.body;
    const secret = verifyEnvironemntVariable(process.env.SECRET, 'SECRET');
    const token = jwt.verify(unverifiedToken, secret);
    const user = await prisma.user.findFirst();
    const pwHash = await argon2.hash(password);
    if (!user) {
      await prisma.user.create({ data: { username, pwHash, email } });
    } else if (user.token === token) {
      await prisma.user.update({
        where: { id: user.id },
        data: { username, pwHash, email },
      });
    } else {
      throw new Error('Wrong Token');
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
