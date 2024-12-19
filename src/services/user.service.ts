import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async getById(id: string): Promise<IUser> {
    return await userRepository.getById(id);
  }
  public async changeUser(id: string, dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.changeUser(id, dto);
  }
  public async delete(id: string): Promise<void> {
    await userRepository.delete(id);
  }
  public async isEmailUnique(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email is already in use", 409);
    }
  }
}
export const userService = new UserService();
