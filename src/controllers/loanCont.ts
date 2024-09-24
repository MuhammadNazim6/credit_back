import { Request, Response } from 'express';
import { LoanModel } from '../models/loanModel';
import { validateFields } from '../utils/validateFields';


export const createLoan = async (req: Request, res: Response) => {
  try {
    const validationResult = validateFields(req.body, ['userId', 'fullName', 'loanAmount', 'tenure', 'employmentStatus', 'employmentAddress', 'reason']);
    if (!validationResult.isValid) {      
      return res.status(400).json({
        success: false,
        message: validationResult.message,
      });
    }
    const body = req.body;
    const loan = await LoanModel.create(body)

    res.status(200).json({
      success: true,
      message: 'Loan request added successfully',
      data: loan
    });

  } catch (error) {
    console.log(error);
    return false;
  }
};


export const getuserLoans = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: `user id is required`
      });
    }

    const userLoans = await LoanModel.find({userId})

    res.status(200).json({
      success: true,
      message: 'User loans',
      data: userLoans
    });

  } catch (error) {
    console.log(error);
    return false;
  }
};



export const getAllLoansAdmin = async (req: Request, res: Response) => {
  try {
    const loans = await LoanModel.find()
    res.status(200).json({
      success: true,
      message: 'Loans',
      data: loans
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};


export const changeLoanStatus = async (req: Request, res: Response) => {
  try {
    const validationResult = validateFields(req.body, ['loanId', 'status']);
    if (!validationResult.isValid) {      
      return res.status(400).json({
        success: false,
        message: validationResult.message,
      });
    }
    const loan = await LoanModel.findById(req.body.loanId)
    if(!loan){
      return res.status(400).json({
        success: false,
        message: 'No loan with specified id',
      });
    }

    loan.loanStatus = req.body.status;
    await loan.save()

    res.status(200).json({
      success: true,
      message: 'Status updated',
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};







