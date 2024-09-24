import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import bcrypt from 'bcrypt'
import { validateFields } from '../utils/validateFields';
import { AdminModel } from '../models/adminModel';

const securePassword = async (password: string) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error);
  }
};


export const signup = async (req: Request, res: Response) => {
  try {
    const validationResult = validateFields(req.body, ['email', 'password', 'name']);
    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
      });
    }

    const body = req.body;
    const userExists = await UserModel.findOne({ email: body.email });
    if (userExists) {
      res.status(200).json({
        success: false,
        message: 'User already exists'
      });
      return
    }
    const data = {
      email: body.email,
      name: body.name,
      password: await securePassword(body.password)
    }
    const user = await UserModel.create(data)
    res.status(200).json({
      success: true,
      message: 'Signup successfull',
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const validationResult = validateFields(req.body, ['email', 'password']);
    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
      });
    }

    const userExists = await UserModel.findOne({ email: req.body.email });
    const adminExists = await AdminModel.findOne({ email: req.body.email });
    console.log(userExists,' userExists');
    console.log(adminExists, ' admin exists');
    
    if (userExists) {
      const passwordMatch = await bcrypt.compare(req.body.password, userExists.password);
      if (!passwordMatch) {
        res.status(200).json({
          success: false,
          message: 'Incorrect username or password entered',
        });
        return
      }
      res.status(200).json({
        success: true,
        message: 'Logged in succesfully',
        data: userExists
      });
      return

    } else if (adminExists) {
      const passwordMatch = await bcrypt.compare(req.body.password, adminExists.password);
      if (!passwordMatch) {
        res.status(200).json({
          success: false,
          message: 'Incorrect username or password entered',
        });
        return
      }
      res.status(200).json({
        success: true,
        message: 'Logged in succesfully',
        data: adminExists,
        isAdmin: true
      });
      return
    }

    if (!userExists) {
      res.status(200).json({
        success: false,
        message: 'User does not exist',
      });
      return
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


export const googleSignin = async (req: Request, res: Response) => {
  try {
    const validationResult = validateFields(req.body, ['email', 'password', 'name']);
    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
      });
    }

    const body = req.body;
    const userExists = await UserModel.findOne({ email: body.email });
    if (userExists) {
      if (userExists.isGoogle) {
        res.status(200).json({
          success: true,
          message: 'Logged in successfully',
          data: userExists
        });
        return
      }

      res.status(200).json({
        success: false,
        message: 'User already exists with this mail'
      });
      return
    }

    const data = {
      email: body.email,
      name: body.name,
      password: await securePassword(body.password),
      isGoogle: true
    }
    const user = await UserModel.create(data)
    res.status(200).json({
      success: true,
      message: 'Signup successfull',
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


export const googleLogin = async (req: Request, res: Response) => {
  try {
    const validationResult = validateFields(req.body, ['email']);
    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
      });
    }

    const userExists = await UserModel.findOne({ email: req.body.email });
    if (!userExists) {
      res.status(400).json({
        success: false,
        message: 'User does not exist',
      });
      return
    }
    if (!userExists.isGoogle) {
      res.status(400).json({
        success: false,
        message: 'This mail not registered with google',
      });
      return
    }

    res.status(200).json({
      success: true,
      message: 'Logged in succesfully',
      data: userExists
    });
    return
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};



