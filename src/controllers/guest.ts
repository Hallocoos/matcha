import * as express from 'express';
import { Request, Response } from 'express';
import * as path from 'path';

const router = express.Router();

router.get('/login', (request: Request, response: Response) => {
  response.sendFile(path.resolve('src/view/guest/login.html'));
});

router.get('/home', (request: Request, response: Response) => {
  response.sendFile(path.resolve('src/view/guest/home.html'));
});

router.get('/', (request: Request, response: Response) => {
  response.sendFile(path.resolve('src/view/index.html'));
});

router.get('/resetPassword', (request: Request, response: Response) => {
  response.sendFile(path.resolve('src/view/guest/resetPassword.html'));
});

router.get('/register', (request: Request, response: Response) => {
  response.sendFile(path.resolve('src/view/guest/register.html'));
});

// router.post('/testRoute', (request: Request, response: Response) => {
//   // validation();
//   response.send(FILE);
// });

export default router;