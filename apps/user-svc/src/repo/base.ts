import { IRegisteredUser, IUser } from "types";

export interface UserRepository {
  createUser(user: IUser): Promise<void>;
  findUserByEmail(email: string): Promise<IRegisteredUser | null>;
  findUserById(userId: string): Promise<IUser | null>;
}
