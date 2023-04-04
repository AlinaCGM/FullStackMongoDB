import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

import UserServices from "../services/users";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    //the token is taken from the user and check if its matches to the one in DB
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    const email = payload.email;
    const foundUser = await UserServices.findUserByEmail(email);
    if (!foundUser) {
      return "no user";
    }
    done(null, foundUser);
  }
);
