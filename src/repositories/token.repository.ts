import { IToken } from "../interfaces/token.interface";
import { Tokens } from "../models/tokens.model";

class TokenRepository {
  public async delete(id: string): Promise<void> {
    await Tokens.findByIdAndDelete(id);
  }
  public async create(dto: any): Promise<IToken> {
    return await Tokens.create(dto);
  }
}
export const tokenRepository = new TokenRepository();
