import { check, validationResult, oneOf, param } from 'express-validator';
import { matchedData } from 'express-validator/filter';

export const createUserValidator = [
  check('username').exists().isString(),
  check('password').exists().isString(),
  check('firstname').exists().isString(),
  check('lastname').exists().isString(),
  check('email').exists().isEmail(),
  check('gender').exists().isString(),
  check('interest').exists().isString(),
  check('age').exists().isString(),
  check('ip').exists().isString(),
  check('countryName').exists().isString(),
  check('regionName').exists().isString(),
  check('city').exists().isString(),
  check('zipcode').exists().isString(),
  check('verified').exists().isString(),
  check('tags').exists().isString(),
  check('fameRating').isNumeric(),
]

// export const newUserValidator = [
//   check('username').exists().notEmpty().isString(),
//   check('password').exists().isString()
// ]

// export const resetPasswordValidator = [
// ]

// export const loginValidator = [
//   check('username').exists().notEmpty().isString(),
//   check('password').exists().isString()
// ]