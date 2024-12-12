import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { readFile, writeFile } from "../services/fs.service";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await readFile();
  }
  public async getById(id: number): Promise<IUser> {
    const users = await readFile();
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return user;
  }
  public async changeUser(id: number, dto: Partial<IUser>): Promise<IUser> {
    const users = await readFile();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new ApiError("user not found", 404);
    }
    users[userIndex].email = dto.email;
    users[userIndex].name = dto.name;
    users[userIndex].password = dto.password;
    await writeFile(users);
    return users[userIndex];
  }
  public async delete(id: number): Promise<void> {
    const users = await readFile();
    const userIndex = users.findIndex((user) => user.id === id);
    if (!userIndex) {
      throw new ApiError("user not found", 404);
    }
    users.splice(userIndex, 1);
    await writeFile(users);
  }
  public async create(dto: Partial<IUser>): Promise<IUser> {
    const users = await readFile();
    const user = {
      id: users[users.length - 1].id + 1,
      name: dto.name,
      password: dto.password,
      email: dto.email,
    };
    users.push(user);
    await writeFile(users);
    return user;
  }
}
export const userRepository = new UserRepository();
