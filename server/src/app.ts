import express from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as userController from './controllers/auth.controller';

const app = express();
dotenv.config({ path: '../.env' });

let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.post('/login', userController.Login);
app.post('/register', userController.Register);
