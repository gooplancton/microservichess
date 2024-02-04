import { IGuest, IRegisteredUser, IUser } from "types";
import { UserRepository } from "./base";

export class MemoryUserRepository implements UserRepository {
  users: Map<string, IUser>;

  constructor() {
    this.users = new Map();
  }

  async findUserByEmail(email: string): Promise<IRegisteredUser | null> {
    const user = Array.from(this.users.values()).find(
      (u) => !u.isGuest && u.email === email,
    );
    if (!user) return null;

    return user as IRegisteredUser;
  }

  async createUser(user: IUser) {
    this.users.set(user._id, user);
  }

  async findUserById(userId: string): Promise<IUser | null> {
    const user = this.users.get(userId);
    if (!user) return null;

    return user;
  }
}
