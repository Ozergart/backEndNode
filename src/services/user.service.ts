import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.create(dto);
  }
  public async getById(id: number): Promise<IUser> {
    return await userRepository.getById(id);
  }
  public async changeUser(id: number, dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.changeUser(id, dto);
  }
  public async delete(id: number): Promise<void> {
    await userRepository.delete(id);
  }
}
export const userService = new UserService();