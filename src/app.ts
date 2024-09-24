import express, { Express, Request, Response } from 'express';
import errorHandler from './middlewares/errorhandler';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import userRoute from './routes/userRoute';
import adminRoute from './routes/adminRoute';
import { connectToDatabase } from './db';

const app: Express = express();
const port = 3000;

dotenv.config();
connectToDatabase()

app.use(cors({
  origin: process.env.CORS_URL, 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type']
}));
app.use(morgan('dev')); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, credit app backendd');
});

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});