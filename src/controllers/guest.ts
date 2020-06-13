import * as express from 'express';
import { Request, Response } from 'express';
import * as userQueries from '../services/users';
import * as imageQueries from '../services/images';
import * as validation from '../services/validation';

const router = express.Router();

router.post('/createUser', (request: Request, response: Response) => {
  // validation();
  response.send(userQueries.insertUser(request.body));
});

router.post('/resetPassword', (request: Request, response: Response) => {
  // validation();
  response.send();
});

router.get('/login', (request: Request, response: Response) => {
  response.send();
});

router.get('/home', (request: Request, response: Response) => {
  response.send();
});

// router.post('/testPOSTRoute', (request: Request, response: Response) => {
//   // validation();
//   response.send(imageQueries.findImagesByUserId(1));
// });

// router.post('/testGETRoute', (request: Request, response: Response) => {
//   // validation();
//   response.send(FILE);
// });

export default router;