import { compare, hash } from "bcrypt";

import { configs } from "../configs/configs";

class PasswordService {
  public async hashPassword(password: string): Promise<string> {
    return await hash(password, configs.hash_rounds);
  }

  public async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await compare(password, hash);
  }
}
export const passwordService = new PasswordService();
