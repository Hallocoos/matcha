import * as express from 'express';
import { Request, Response } from 'express';
import { modifyUserPasswordByHash, verifyUserByHash, retrieveUserByUsername, retrieveUserByEmail, addUser, hashing, User } from '../models/userModel';
import { createUserValidator, userLoginValidator } from '../services/validation';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { sendNewUserEmail, resetUserPassword } from '../helpers/email';

const router = express.Router();

router.post('/createUser', async (request: Request, response: Response) => {
  let errors = createUserValidator(request);

  if (errors) {
    response.send({ text: errors });
  } else {
    request.body.hash = await (await hashing('asdfasdf')).replace('/', '');
    var user = await addUser(new User(await request.body));
    sendNewUserEmail(user);
    response.send(user);
  }
});

router.post('/login', async (request: Request, response: Response) => {
  let errors = userLoginValidator(request);
  if (!errors) {
    var user = new User(await retrieveUserByUsername(request.body.username));
    if (user.id && await bcrypt.compare(request.body.password, user.password)) {
      var token = await jwt.sign(JSON.stringify(user), process.env.SECRETKEY);
      response.json({ token: token });
    } else
      response.send({ text: 'Username or Password was incorrect.' });
  } else
    response.send({ text: errors });
});

router.get('/verify/:hash', async (request: Request, response: Response) => {
  await verifyUserByHash(request.params.hash)
  response.redirect('/login');
});

router.post('/forgotPassword', async (request: Request, response: Response) => {
  const user = await retrieveUserByEmail(request.body.email);
  response.send(await resetUserPassword(user.email, user.hash));
});

router.post('/resetPassword/', async (request: Request, response: Response) => {
  response.send(await modifyUserPasswordByHash(request.body));
});

// router.post('/testRoute', (request: Request, response: Response) => {
//   response.send(FILE);
// });

export default router;