import * as express from 'express';
import { Request, Response } from 'express';
import { setUserAsOnlineStatus, modifyUserPasswordByHash, verifyUserByHash, retrieveUserByUsername, retrieveUserByEmail, addUser, hashing, User } from '../models/userModel';
import { createUserValidator, resetPasswordValidator, userLoginValidator } from '../services/validation';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { sendNewUserEmail, resetUserPassword } from '../helpers/email';
import { knexDeleteById } from '../services/dbService';
import { locateUser } from "../helpers/locator";

const router = express.Router();

// { "username": "qwerqwer", "password": "asdfasdf", "email": "asdf@asdf.asdf", "firstname": "asdfasdf", "lastname": "asdfasdf", "gender": "male/female/other" "age": "94"}
router.post('/createUser', async (request: Request, response: Response) => {
  let errors = await createUserValidator(request);
  if (!errors) {
    request.body.password = await hashing(request.body.password);
    request.body.hash = await (await hashing(request.body.username)).replace('/', '');
    var user = await addUser(request.body);
      await sendNewUserEmail(user)
      await locateUser(user).catch(e => response.send({ text: e, success: false }));
      response.send({ text: 'User has succesfully been created.', success: true });
  } else
    response.send({ text: errors, success: false });
});

// { "username": "qwerqwer", "password": "asdfasdf"}
router.post('/login', async (request: Request, response: Response) => {
  let errors = userLoginValidator(request);
  if (errors)
    response.send({ text: errors, success: false });
  else {
    var user = await retrieveUserByUsername(request.body.username);
    if (user && await bcrypt.compare(request.body.password, user.password)) {
      if (user.verified) {
        let token = await jwt.sign(JSON.stringify(user), process.env.SECRETKEY);
        response.json({ token: token, text: 'Login was successful.', success: true });
        await setUserAsOnlineStatus(user.id, true);
        await locateUser(user).catch(e => response.send({ text: e, success: false }));
      } else
        response.send({ text: 'Please verify your account via your associated email account.', success: false });
    } else
      response.send({ text: 'Username or Password was incorrect.', success: false });
  }
});

// { id: 1 }
router.post('/logout', async (request: Request, response: Response) => {
  await setUserAsOnlineStatus(request.body.id, false);
  response.send({ text: 'User has been logged out.', success: true });
});

// GET - localhost:3000/verify/$2b$04$wCMG3qANQu1Ck.E5uDv3JejX8SmqzTdb.gZO3rxhbOrh6Kd2oiU6
router.get('/verify/:hash', async (request: Request, response: Response) => {
  const user = await verifyUserByHash(request.params.hash);
  if (user)
    response.send({ text: 'User has successfully been verified.', success: true });
  else
    response.send({ text: 'User has not been verified.', success: false });
});

// {"email": "wdv@mailinator.com"}
router.post('/forgotPassword', async (request: Request, response: Response) => {
  const user = await retrieveUserByEmail(request.body.email);
  if (user)
    resetUserPassword(user.email, user.hash);
  response.send({ text: 'Check your email inbox to see how to reset your password.', success: true });
});

// { "password": "password", "hash": "$2b$04$x9ki6NOrVtVRBUG2fvvl.ZjHnh9HFrcbr9QbVlCzzxWmr0spH1e6" }
router.post('/resetPassword', async (request: Request, response: Response) => {
  let errors = resetPasswordValidator(request.body);
  if (!errors) {
    var user = await modifyUserPasswordByHash(request.body);
    if (user)
      response.send({ text: 'Password has been reset.', success: true });
    else
      response.send({ text: 'Password has not been reset.', success: false });
  } else
    response.send({ text: errors, success: false });
});

export default router;