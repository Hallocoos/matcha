import * as express from 'express';
import { Request, Response } from 'express';
import { retrieveUserByUsername, addUser } from '../models/userModel';
import { createUserValidator } from '../services/validation';
import User from '../models/userModel';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { sendNewUserEmail } from '../helpers/email';

const router = express.Router();

router.post('/createUser', async (request: Request, response: Response) => {
  let errors = createUserValidator(request, response);

  if (request.body.errors) {
    request.body.errors = errors;
    return response.status(422).jsonp(request.body);
  } else {
    var user = new User(await request.body);
    user = await addUser(user);
    response.send(user);
    sendNewUserEmail(user);
  }
});

router.post('/resetPassword', (request: Request, response: Response) => {
  // send email
  response.send();
});

router.post('/login', async (request: Request, response: Response) => {
  if (!request.body.username || !request.body.password)
    response.redirect('/login');
  const user = new User(
    await retrieveUserByUsername(request.body.username)
  );
  if (user.id)
    if (await bcrypt.compare(request.body.password, user.password)) {
      var token = jwt.sign(JSON.stringify(user), process.env.SECRETKEY);
      response.json({ token: token });
    } else {
      response.send("failed to login");
    }
  else
    response.send("failed to login");
});

// router.post('/testRoute', (request: Request, response: Response) => {
//   response.send(FILE);
// });

export default router;