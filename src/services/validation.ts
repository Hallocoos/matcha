import { check, validationResult, oneOf, param } from 'express-validator';
import { matchedData } from 'express-validator/filter';

// export const postUserInputValidator = [
//   check('username').exists().isString().not().isNumeric(),
//   check('pssword').exists().isString()
// ]

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