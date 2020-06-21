import { retrieveUserByUsername, retrieveUserByEmail } from '../models/userModel';

export async function createUserValidator(request) {
  const user = request.body;
  const username = await retrieveUserByUsername(user.username);
  if (username)
    return ('Username is in use.');
  const email = await retrieveUserByEmail(user.email);
  if (email)
    return ('Email is in use.');
  if (!exists(user.username) || !isString(user.username) || user.username.length < 4)
    return ('Username is Invalid');
  if (!exists(user.password) || !isString(user.password) || !complexPassword(user.password))
    return ('Password is Invalid');
  if (!exists(user.firstname) || !isString(user.firstname) || user.firstname.length < 4)
    return ('First name is Invalid');
  if (!exists(user.lastname) || !isString(user.lastname) || user.lastname.length < 4)
    return ('Last name is Invalid');
  if (!exists(user.gender) || !isString(user.gender) || !genderClassification(user.gender))
    return ('Gender is Invalid');
  if (!exists(user.interest) || !isString(user.interest) || !genderClassification(user.interest))
    return ('Interest is Invalid');
  if (!exists(user.tags) || !isString(user.tags))
    return ('Tags are Invalid');
  if (!exists(user.email) || !isString(user.email) || !isEmail(user.email))
    return ('Email is Invalid');
  if (!exists(user.age) || !isNumeric(user.age) || user.age < 18)
    return ('Age is Invalid');
  return undefined;
};

export function userLoginValidator(request) {
  const user = request.body;
  if (!exists(user.username) || !isString(user.username))
    return ('Username is Invalid');
  if (!exists(user.password) || !isString(user.password))
    return ('Password is Invalid');
  return undefined;
}

export function resetPasswordValidator(data) {
  if (!exists(data.newPassword) || !isString(data.newPassword) || !complexPassword(data.newPassword))
    return ('Password is Invalid');
  if (!exists(data.hash))
    return ('Hash is Invalid')
  return undefined;
}

export async function updateUserValidator(request) {
  const user = request.body;
  const username = await retrieveUserByUsername(user.username);
  if (username)
    return ('Username is in use.');
  const email = await retrieveUserByEmail(user.email);
  if (email)
    return ('Email is in use.');
  if (user.username)
    if (!isString(user.username) && user.username.length < 4)
      return ('Username is Invalid');
  if (user.password)
    if (!isString(user.password) || !complexPassword(user.password))
      return ('Password is Invalid');
  if (user.firstname)
    if (!isString(user.firstname) || user.firstname.length < 4)
      return ('First name is Invalid');
  if (user.lastname)
    if (!isString(user.lastname) || user.lastname.length < 4)
      return ('Last name is Invalid');
  if (user.gender)
    if (!isString(user.gender) || !genderClassification(user.gender))
      return ('Gender is Invalid');
  if (user.interest)
    if (!isString(user.interest) || !genderClassification(user.interest))
      return ('Interest is Invalid');
  if (user.tags)
    if (!isString(user.tags))
      return ('Tags are Invalid');
  if (user.email)
    if (!isString(user.email) || !isEmail(user.email))
      return ('Email is Invalid');
  if (user.age)
    if (!isNumeric(user.age) || user.age < 18)
      return ('Age is Invalid');
  return undefined;
};

export function exists(exists) {
  if (exists)
    return true;
  return false;
};

export function isString(string) {
  if (typeof string === 'string')
    return true;
  return false;
};

export function isNumeric(number: string | number): boolean {
  return (!isNaN(Number(number.toString())));
}

export function isEmail(email) {
  return /\S+@\S+\.\S+/.test(email)
};

export function genderClassification(gender) {
  if (gender === 'male' || gender === 'female' || gender === 'other' || gender === 'Male' || gender === 'Female' || gender === 'Other')
    return true;
  return false;
};

export function complexPassword(password) {
  if (password.length > 7)
    return true;
  return false;
};