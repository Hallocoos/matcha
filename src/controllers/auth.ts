import * as express from 'express';
import { Request, Response } from 'express';
import { modifyUserPasswordByHash, verifyUserByHash, retrieveUserByUsername, retrieveUserByEmail, addUser, hashing, User } from '../models/userModel';
import {createUserValidator, resetPasswordValidator, userLoginValidator} from '../services/validation';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { sendNewUserEmail, resetUserPassword } from '../helpers/email';
import { locateUser } from "../helpers/locator";
import ipLocation from "iplocation/dist";
// import {filterByDistance} from "../helpers/filterUsersByDistance";
import {filterByDistance} from "../helpers/locator";

const ipify = require('ipify');
const router = express.Router();

router.post('/createUser', async (request: Request, response: Response) => {
  let errors = await createUserValidator(request);
  if (!errors) {
    request.body.password = await hashing(request.body.password);
    request.body.hash = await hashing(request.body.username);
    var user = new User(await addUser(request.body));
    console.log(user);
    await sendNewUserEmail(user);
    response.send({ text: 'User has succesfully been created.', success: true });
  } else
    response.send({ text: errors, success: false });
});

router.post('/login', async (request: Request, response: Response) => {
  let errors = userLoginValidator(request);
  if (errors)
    response.send({ text: errors });
  else {
    var user = new User(await retrieveUserByUsername(request.body.username));
    if (user.id && await bcrypt.compare(request.body.password, user.password)) {
      if (user.verified) {
        var token = await jwt.sign(JSON.stringify(user), process.env.SECRETKEY);
        await locateUser(user, await ipify({useIPv6: false})).catch(e => response.send({text: e, success: false}));
        let num = await filterByDistance(user);
        console.log(num, " KM");
        response.json({ token: token, text: 'Login was successful.', success: true });
      } else
        response.send({ text: 'Please verify your account via your associated email account.', success: false });
    } else
      response.send({ text: 'Username or Password was incorrect.', success: false });
  }
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