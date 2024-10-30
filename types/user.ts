interface UserAddresss {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddresss;
  phone: string;
  website: string;
  company: UserCompany;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface UserContextType {
  users: User[];
}
