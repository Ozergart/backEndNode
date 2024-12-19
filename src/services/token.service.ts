import * as jwt from "jsonwebtoken";

import { configs } from "../configs/configs";

class TokenService {
  public async generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: configs.JWT_ACCESS_EXPIRES,
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: configs.JWT_REFRESH_EXPIRES,
    });
    return { accessToken, refreshToken };
  }
}
export const tokenService = new TokenService();
