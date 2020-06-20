import * as express from 'express';
import { Request, Response } from 'express';
import * as path from 'path';

const router = express.Router();

router.get('/login', (request: Request, response: Response) => {
  // response.sendFile(path.resolve('src/view/guest/login.html'));
});

router.get('/forgotPassword', (request: Request, response: Response) => {
  // response.sendFile(path.resolve('src/view/guest/resetPassword.html'));
});

router.get('/register', (request: Request, response: Response) => {
  // response.sendFile(path.resolve('src/view/guest/register.html'));
});

// router.post('/testRoute', async (request: Request, response: Response) => {
//   response.send();
// });

export default router;