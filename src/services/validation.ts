export function createUserValidator(request, response) {
  const user = request.body;
  if (!exists(user.username) || !isString(user.username) || user.username.length < 4)
    return ("Username is Invalid");
  if (!exists(user.password) || !isString(user.password) || !complexPassword(user.password))
    return ("Password is Invalid");
  if (!exists(user.firstname) || !isString(user.firstname) || user.firstname.length < 4)
    return ("First name is Invalid");
  if (!exists(user.lastname) || !isString(user.lastname) || user.lastname.length < 4)
    return ("Last name is Invalid");
  if (!exists(user.gender) || !isString(user.gender) || !genderClassification(user.gender))
    return ("Gender is Invalid");
  if (!exists(user.interest) || !isString(user.interest) || !genderClassification(user.interest))
    return ("Interest is Invalid");
  if (!exists(user.tags) || !isString(user.tags))
    return ("Tags are Invalid");
  if (!exists(user.email) || !isString(user.email) || !isEmail(user.email))
    return ("Email is Invalid");
  if (!exists(user.age) || !isNumeric(user.age) || user.age < 18)
    return ("Age is Invalid");
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