import * as bcrypt from 'bcrypt';
import * as knex from '../../database/knex'
import { knexSelectByColumn, knexInsert, knexSelectAll, knexUpdateById } from '../services/dbService';
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
  longitude: string;
  latitude: string;
  zipcode: string;
  distance: number;
  verified: boolean;
  tags: string[];
  fame: number;
  hash: string;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  };
  // method() {};
};

// function to handle getting all users
export async function retrieveUsers(): Promise<User[]> {
  const result = await knexSelectAll('users');
  if (result)
    return (result);
  return (undefined);
};

/*
 *  Function to handle getting valid matches by gender
 *  @Incoming Params: body = { interest = <string> }
*/
export async function retrieveUsersByGender(filters, interest, gender, orderByColumn, sort) {
  if (orderByColumn == 'distance' || orderByColumn == 'tags')
    orderByColumn = 'fame';
  if (sort == 'ascending')
    var direction = 'asc';
  else
    var direction = 'desc';
  return knex.select()
    .from('users').where({
      gender: interest,
      interest: gender
    })
    .where('age', '>', filters.ageMin || 0)
    .where('age', '<', filters.ageMax || 1000)
    .where('fame', '>', filters.fameMin || 0)
    .where('fame', '<', filters.fameMax || 100000)
    .orderBy(orderByColumn, direction)
    .then(function (result) {
      return result;
    });
};

// function to handle get user by id
export async function retrieveUserById(id: string): Promise<User> {
  const result = await knexSelectByColumn('id', id, 'users');
  if (result[0])
    return (result[0]);
  return (undefined);
};

// function to handle get user by hash
export async function verifyUserByHash(hash: string): Promise<User> {
  return knex('users')
    .where('hash', hash)
    .update('verified', true)
    .then(async function () {
      return (await retrieveUserByHash(hash));
    });
};

// function to handle get user by username
export async function retrieveUserByUsername(username: string) {
  const result = await knexSelectByColumn('username', username, 'users');
  if (result[0])
    return (result[0]);
  return (undefined);
};

// function to handle get user by email
export async function retrieveUserByEmail(email: string) {
  const result = await knexSelectByColumn('email', email, 'users');
  if (result[0])
    return (result[0]);
  return (undefined);
};

// function to handle get user by email
export async function retrieveUserByHash(hash: string): Promise<User> {
  const result = await knexSelectByColumn('hash', hash, 'users');
  if (result[0])
    return (result[0]);
  return (undefined);
};

// function to handle adding users
export async function addUser(body: User): Promise<User> {
  const result = await knexInsert(body, 'users');
  return (await retrieveUserByUsername(body.username));
};

/*
 *  Function to handle modifying a user
 *  @Incoming Params: { hash: value, key1: value1, ... }
*/
export async function modifyUserPasswordByHash(body) {
  var user = await retrieveUserByHash(body.hash);
  if (user) {
    body.password = await hashing(body.password);
    await knexUpdateById({ password: body.password }, user.id, 'users');
    return (await retrieveUserById(user.id));
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
  await knexUpdateById(body, id, 'users');
  return (await retrieveUserById(id));
};

/*
 *  Function to handle wether a user is online
 *  @Incoming Params: { id: value, matchable: false }
*/
export async function setUserAsOnlineStatus(id, status) {
  await knexUpdateById({online: status, lastSeen: knex.fn.now()}, id, 'users');
  return (await retrieveUserById(id));
};

/*
 *  Function to handle wether a user is matchable
 *  @Incoming Params: { id: value, matchable: false }
*/
export async function setUserAsMatchableById(id, matchable) {
  await knexUpdateById({matchable: matchable}, id, 'users');
  return (await retrieveUserById(id));
};

/*
 *  Function to handle the increments on fame
 *  @Incoming Params: { id: value, key1: value1, ... }
*/
export async function incrementUsersFameRating(id, amount) {
  const user = await retrieveUserById(id);
  await knexUpdateById({fame: user.fame + amount}, id, 'users');
  return (await retrieveUserById(id));
};

export async function hashing(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  if (hash)
    return (hash);
  return (undefined);
}

export default User;