class User {
  // property: datatype;
  id: string;
  username: string;
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
  zip: string;
  verified: boolean;

  constructor(data: Partial<User>) {
      Object.assign(this, data);
  };
  // method() {};
}

export default User;