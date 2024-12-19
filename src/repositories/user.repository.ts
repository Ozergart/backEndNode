import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { passwordService } from "../services/password.service";

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
  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email });
  }
  public async create(dto: IUserCreateDto): Promise<IUser> {
    const password = await passwordService.hashPassword(dto.password);
    return await User.create({ ...dto, password });
  }
}
export const userRepository = new UserRepository();
