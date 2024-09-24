import { Request, Response } from 'express';
import { AdminModel } from '../models/adminModel';
import bcrypt from 'bcrypt'
import { validateFields } from '../utils/validateFields';



const comparePassword = async (password: string, hashedPassword: string) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.log(error);
    return false;
  }
};


export const adminLogin = async (req: Request, res: Response) => {
  try {
    const validationResult = validateFields(req.body, ['email', 'password']);
    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
      });
    }

    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email })
    if (admin) {
      const correctPassword = await comparePassword(password, admin.password)
      if (correctPassword) {
        return res.status(200).json({
          success: true,
          message: `Admin log in success`,
          data: admin,
          isAdmin:true
        });
      }
    }

    return res.status(400).json({
      success: false,
      message: `Incorrect login details entered`,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

