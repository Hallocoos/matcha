import * as express from 'express';
import { Request, Response } from 'express';
import * as userQueries from '../services/users';
import * as validation from '../services/validation';

const router = express.Router();

// router.post('/chat/:user', (request: Request, response: Response) => {
//   validation();
//   response.send();
// });

router.post('/updateUserInformation', (request: Request, response: Response) => {
  // validation();
  response.send(userQueries.updateUser(request.body));
});

export default router;