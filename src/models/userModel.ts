import * as bcrypt from 'bcrypt';
import { knexSelectByColumn, knexInsert, knexSelectAll, knexUpdateById } from '../services/dbService';
const saltRounds = 3;

class User {
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

// function to handle get user by userName
export async function retrieveUserByUsername(username: string): Promise<User> {
  const result = await knexSelectByColumn('username', username, 'users');
  if (result) {
    return (result);
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

// function to handle modifying a user
export async function modifyUser(body) {
  const id = body.id;
  delete body.id;
  const user = new User(await retrieveUserById(id));
  if (user)
    return (new User(await knexUpdateById(body, id, 'users')));
};


export async function hashing(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  if (hash) {
    return (hash);
  } else {
    return (undefined);
  }
}

export default User;