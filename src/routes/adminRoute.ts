import express, { Request, Response } from 'express';
import { adminLogin } from '../controllers/adminCont';
import { changeLoanStatus, getAllLoansAdmin } from '../controllers/loanCont';

const adminRoute = express.Router();

adminRoute.post("/login", adminLogin)
adminRoute.get("/all-loans", getAllLoansAdmin)
adminRoute.patch("/changeStatus", changeLoanStatus)


export default adminRoute;