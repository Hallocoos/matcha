import * as express from 'express';
import { Request, Response } from 'express';
import { retrieveUserByUsername, addUser } from '../models/userModel';
import * as validation from '../services/validation';
import User from '../models/userModel';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';


const router = express.Router();

router.post('/createUser', async (request: Request, response: Response) => {
  const user = new User(await request.body);
  // validation
  response.send(addUser(user));
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