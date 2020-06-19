import { check, validationResult, oneOf, param } from 'express-validator';
import { matchedData } from 'express-validator/filter';

export const postUserInputValidator = [
  check('username').exists().isString().not().isNumeric(),
  check('password').exists().isString(),
  check('firstname'),
  check('lastname'),
  check('email'),
  check('gender'),
  check('interest'),
  check('age'),
  check('ip'),
  check('countryName'),
  check('regionName'),
  check('city'),
  check('zipcode'),
  check('verified'),
  check('tags'),
  check('fameRating'),
]

export const newUserValidator = [
  check('username').exists().notEmpty().isString(),
  check('password').exists().isString()
]

export const resetPasswordValidator = [
]

export const loginValidator = [
  check('username').exists().notEmpty().isString(),
  check('password').exists().isString()
]