import * as bcrypt from 'bcrypt';
import * as knex from '../../database/knex'
import { knexSelectByColumn, knexInsert, knexSelectAll, knexUpdateById } from '../services/dbService';
import { orderBy } from 'lodash';
const saltRounds = 3;

export class User {
  // property: datatype;
  id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  interest: string;
  age: string;
  ip: string;
  countryName: string;
  regionName: string;
  city: string;
  zipcode: string;
  verified: boolean;
  tags: string[];
  fameRating: number;
  hash: string;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  };
  // method() {};
};

// function to handle getting all users
export async function retrieveUsers(): Promise<User[]> {
  const result = await knexSelectAll('users');
  if (result) {
    return (result);
  } else {
    return (undefined);
  }
};

// function to handle get user by id
export async function retrieveUserById(id: string): Promise<User> {
  const result = await knexSelectByColumn('id', id, 'users');
  if (result) {
    return (result);
  } else {
    return (undefined);
  }
};

// function to handle get user by id
export async function verifyUserByHash(hash: string): Promise<User> {
  return knex('users')
    .where('hash', hash)
    .update('verified', true)
    .then(async function () {
      return (await knexSelectByColumn('hash', hash, 'users'));
    });
};

// function to handle get user by username
// /login
export async function retrieveUserByUsername(username: string) {
  const result = await knexSelectByColumn('username', username, 'users');
  if (result[0]) {
    return (result[0]);
  } else {
    return (undefined);
  }
};

// function to handle get user by email
export async function retrieveUserByEmail(email: string) {
  const result = await knexSelectByColumn('email', email, 'users');
  if (result[0]) {
    return (result[0]);
  } else {
    return (undefined);
  }
};

// function to handle get user by email
export async function retrieveUserByHash(hash: string): Promise<User> {
  const result = await knexSelectByColumn('hash', hash, 'users');
  if (result[0]) {
    return (result[0]);
  } else {
    return (undefined);
  }
};

// function to handle adding users
export async function addUser(body: User): Promise<User> {
  if (body) {
    const hashedPassword = await hashing(body.password);
    body.password = hashedPassword;
    const result = await knexInsert(body, 'users');
    return (result[0]);
  } else {
    return (undefined);
  }
};

/*
 *  Function to handle modifying a user
 *  @Incoming Params: { hash: value, key1: value1, ... }
*/
export async function modifyUserPasswordByHash(body) {
  var user = await retrieveUserByHash(body.hash);
  if (user) {
    body.newPassword = await hashing(body.newPassword);
    await knexUpdateById({ password: body.newPassword }, user.id, 'users');
    return (await knexSelectByColumn('id', user.id, 'users'));
  }
  return (undefined);
};

/*
 *  Function to handle modifying a user, will insert value in column called key
 *  @Incoming Params: { id: value, key1: value1, ... }
*/
export async function modifyUserById(body) {
  const id = body.id;
  delete body.id;
  if (body)
    return (await knexUpdateById(body, id, 'users'));
  else
    return (0);
};

export async function hashing(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  if (hash) {
    return (await (hash).replace('/', ''));
  } else {
    return (undefined);
  }
}

export default User;