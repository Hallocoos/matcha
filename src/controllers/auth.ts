import * as express from 'express';
import { Request, Response } from 'express';
import * as userQueries from '../services/users';
import * as validation from '../services/validation';
import User from '../models/userClass';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';


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
  console.log("POST Works!");
  console.log(request.body);
  if (!request.body.username || !request.body.password)
    response.redirect('/login');
  const user = new User(
    await userQueries.findUserByUsernameAndPassword(request.body.username, request.body.password)
  );
  console.log(user[0]);
  if (user[0])
  {
    var token = jwt.sign(user[0], process.env.SECRETKEY);
    // response.header['token'] = token;
    response.status(200).send({ auth: true, token: token });
    // response.sendFile(path.resolve('src/view/guest/home.html'), );
  } else {
    response.send("failed to login");
  }
});

// router.post('/testRoute', (request: Request, response: Response) => {
//   response.send(FILE);
// });

export default router;