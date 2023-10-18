import { FilterQuery } from "mongoose";

import { ITokenDB } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(tokenPair: Partial<ITokenDB>) {
    return await Token.create(tokenPair);
  }
  public async deleteOne(params: FilterQuery<ITokenDB>): Promise<void> {
    await Token.deleteOne(params);
  }
  public async findOne(params: FilterQuery<ITokenDB>) {
    return await Token.findOne(params);
  }
}

export const tokenRepository = new TokenRepository();
