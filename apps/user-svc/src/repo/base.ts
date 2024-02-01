import { IGuest, IRegisteredUser, IUser } from "types";

export interface UserRepository {
  createUser(user: IRegisteredUser): Promise<void>;
  createGuest(guest: IGuest): Promise<void>;
  findUserByEmail(email: string): Promise<IRegisteredUser | null>;
  findUserById(userId: string): Promise<IUser | null>;
}
