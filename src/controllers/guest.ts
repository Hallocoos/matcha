import * as express from 'express';
import { Request, Response } from 'express';
import * as path from 'path';
import * as user from '../models/userModel';
import * as image from '../models/imageModel';

const router = express.Router();

router.get('/login', (request: Request, response: Response) => {
  // response.sendFile(path.resolve('src/view/guest/login.html'));
});

router.get('/home', (request: Request, response: Response) => {
  // response.sendFile(path.resolve('src/view/guest/home.html'));
});

router.get('/', (request: Request, response: Response) => {
  // response.sendFile(path.resolve('src/view/index.html'));
});

router.get('/resetPassword', (request: Request, response: Response) => {
  // response.sendFile(path.resolve('src/view/guest/resetPassword.html'));
});

router.get('/register', (request: Request, response: Response) => {
  // response.sendFile(path.resolve('src/view/guest/register.html'));
});

router.post('/testRoute', async (request: Request, response: Response) => {
  // validation();
  console.log('/testRoute');
  response.send(await image.retrieveImages());
});

export default router;