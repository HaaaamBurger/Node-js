import { ITokenDB } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(tokenPair: Partial<ITokenDB>) {
    return await Token.create(tokenPair);
  }
}

export const tokenRepository = new TokenRepository();
