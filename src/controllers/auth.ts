import * as express from 'express';
import { Request, Response } from 'express';
import { modifyUserPasswordByHash, verifyUserByHash, retrieveUserByUsername, retrieveUserByEmail, addUser, hashing, User } from '../models/userModel';
import { createUserValidator } from '../services/validation';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { sendNewUserEmail, resetUserPassword } from '../helpers/email';

const router = express.Router();

router.post('/createUser', async (request: Request, response: Response) => {
  let errors = createUserValidator(request, response);

  if (request.body.errors) {
    request.body.errors = errors;
    return response.status(422).jsonp(request.body);
  } else {
    request.body.hash = await (await hashing(request.body.password)).replace('/', '');
    var user = new User(await request.body);
    user = await addUser(user);
    sendNewUserEmail(user);
    response.send(user);
  }
});

router.post('/login', async (request: Request, response: Response) => {
  if (!request.body.username || !request.body.password)
    response.redirect('/login');
  var user = new User(
    await retrieveUserByUsername(request.body.username)
  );
  user = user[0];
  if (user.id)
    if (await bcrypt.compare(request.body.password, user.password)) {
      var token = await jwt.sign(JSON.stringify(user), process.env.SECRETKEY);
      response.json({ token: token });
    } else {
      response.send("failed to login");
    }
  else
    response.send("failed to login");
});

router.get('/verify/:hash', async (request: Request, response: Response) => {
  response.send(await verifyUserByHash(request.params.hash));
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