import * as express from 'express';
import { Request, Response } from 'express';
import * as userQueries from '../services/users';
import * as validation from '../services/validation';
import User from '../models/userClass';
import * as jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/createUser', async (request: Request, response: Response) => {
  var user = new User(await request.body);
  // validation
  response.send(userQueries.insertUser(user));
});

router.post('/resetPassword', (request: Request, response: Response) => {
  // send email
  response.send();
});

router.post('/login', async (request: Request, response: Response) => {
  const user = new User(
    await userQueries.findUserByUsernameAndPassword(request.body.username, request.body.password)
  );
  const token = jwt.sign({ user }, process.env.SECRETKEY);
  response.json({ token: token });
});

// router.post('/testRoute', (request: Request, response: Response) => {
//   response.send(FILE);
// });

export default router;