import * as express from 'express';
import { Request, Response } from 'express';
import * as userQueries from '../services/users';
import * as validation from '../services/validation';

const router = express.Router();

// router.post('/route', (request: Request, response: Response) => {
//   validation();
//   response.send();
// });

router.post('/login', (request: Request, response: Response) => {
  // validation();
  response.send(userQueries.findUserByUsernameAndPassword(request.body.username, request.body.password));
});

export default router;