import * as express from 'express';
import { Request, Response } from 'express';
import * as userQueries from '../services/users';
import * as validation from '../services/validation';
import User from '../models/userClass';
import { verifyToken, Roles } from '../services/jwt';

const router = express.Router();

router.post('/updateUser', (request: Request, response: Response) => {
  response.send(userQueries.updateUser(request.body));
});

router.post('/findAllUsers', verifyToken(Roles.Admin), async (request: Request, response: Response) => {
  const user = new User( await userQueries.findAllUsers() );
  response.send(user);
});

router.post('/findUserById', async (request: Request, response: Response) => {
  const user = new User( await userQueries.findUserById(request.body.id) );
  response.send(user);
});

// router.post('/testRoute', (request: Request, response: Response) => {
//   response.send(FILE);
// });

export default router;