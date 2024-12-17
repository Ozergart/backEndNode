export interface IUser {
  _id: string;
  name: string;
  email: string;
  age: number;
  password: string;
  phone?: string;
  role: string;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
