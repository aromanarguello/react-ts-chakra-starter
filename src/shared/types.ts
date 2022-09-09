export interface Id {
  id: string;
}

export interface NewUser {
  email: string;
  password: string;
}

export interface UserProfile extends Id {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
}

export type User = NewUser & Id;
