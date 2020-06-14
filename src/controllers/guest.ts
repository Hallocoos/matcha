import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.get('/login', (request: Request, response: Response) => {
  response.send();
});

router.get('/home', (request: Request, response: Response) => {
  response.send();
});

router.get('/resetPassword', (request: Request, response: Response) => {
  response.send();
});

router.get('/register', (request: Request, response: Response) => {
  response.send();
});

// router.post('/testRoute', (request: Request, response: Response) => {
//   // validation();
//   response.send(FILE);
// });

export default router;