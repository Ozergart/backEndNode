import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find();
  }
  public async getById(id: string): Promise<IUser> {
    return await User.findById(id);
  }
  public async changeUser(id: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(id, dto, { new: true });
  }
  public async delete(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }
  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }
}
export const userRepository = new UserRepository();
