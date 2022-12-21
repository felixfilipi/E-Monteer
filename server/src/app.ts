import express from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as userController from './controllers/auth.controller';
import { isAuthenticated } from "./middleware/authMiddleware";

const app = express();
const router = express.Router();
dotenv.config({ path: '../.env' });

let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.post('/login', userController.Login);
app.post('/register', userController.Register);
app.post('/refreshtoken', isAuthenticated, userController.RefreshToken);
app.post('/revoketoken', userController.RevokeToken);
