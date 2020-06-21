import * as express from 'express';
import { Request, Response } from 'express';
import { modifyUserPasswordByHash, verifyUserByHash, retrieveUserByUsername, retrieveUserByEmail, addUser, hashing, User } from '../models/userModel';
import { createUserValidator, userLoginValidator } from '../services/validation';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { sendNewUserEmail, resetUserPassword } from '../helpers/email';

const router = express.Router();

router.post('/createUser', async (request: Request, response: Response) => {
  let errors = await createUserValidator(request);
  if (errors)
    response.send({ text: errors });
  request.body.hash = await (await hashing(request.body.username)).replace('/', '');
  var user = new User(await addUser(request.body));
  sendNewUserEmail(user);
  if (user)
    response.send({ login: 'true' });
});

router.post('/login', async (request: Request, response: Response) => {
  let errors = userLoginValidator(request);
  if (errors)
    response.send({ text: errors });
  var user = new User(await retrieveUserByUsername(request.body.username));
  if (user.id && await bcrypt.compare(request.body.password, user.password)) {
    var token = await jwt.sign(JSON.stringify(user), process.env.SECRETKEY);
    response.json({ token: token, text: 'Login was successful.' });
  } else
    response.send({ text: 'Username or Password was incorrect.' });
});

router.get('/verify/:hash', async (request: Request, response: Response) => {
  const user = await verifyUserByHash(request.params.hash);
  if (user)
    response.send({ text: 'User has successfully been verified.', success: true });
  else
    response.send({ text: 'User has not been verified.', success: false });
});

router.post('/forgotPassword', async (request: Request, response: Response) => {
  const user = await retrieveUserByEmail(request.body.email);
  resetUserPassword(user.email, user.hash);
  if (user)
    response.send({ text: 'Check your email inbox to see how to reset your password.', success: true });
  else
    response.send({ text: 'Check your email inbox to see how to reset your password.', success: true });

});

router.post('/resetPassword/', async (request: Request, response: Response) => {
  var user = await modifyUserPasswordByHash(request.body);
  if (user)
    response.send({ text: 'Password has been reset.', success: true });
  else
    response.send({ text: 'Invalid hash has been passed.', success: false });
});

// router.post('/testRoute', (request: Request, response: Response) => {
//   response.send(FILE);
// });

export default router;