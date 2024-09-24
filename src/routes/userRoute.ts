import express, { Request, Response } from 'express';
import { googleLogin, googleSignin, login, signup } from '../controllers/userCont';
import { createLoan, getuserLoans } from '../controllers/loanCont';

const userRoute = express.Router();

userRoute.post("/login", login)
userRoute.post("/signup", signup)
userRoute.post("/google-signin", googleSignin)
userRoute.post("/google-login", googleLogin)
userRoute.post("/loan-request", createLoan)
userRoute.get("/user-loans/:userId", getuserLoans)


export default userRoute;