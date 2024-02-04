import { UserRepository } from "./base";
import { MongoClient, Collection } from "mongodb";
import { IRegisteredUser, IUser } from "types";
import { ServerError, Status } from "nice-grpc";

export class MongoDBUserRepository implements UserRepository {
  connected: boolean = false;
  users: Collection<IUser>;

  constructor(url: string) {
    const client = new MongoClient(url);
    client.connect().then(() => (this.connected = true));

    this.users = client.db("microservichess").collection<IUser>("users");
  }

  async createUser(user: IUser) {
    if (!this.connected)
      throw new ServerError(Status.UNAVAILABLE, "not connected");

    await this.users.insertOne(user);
  }

  async findUserByEmail(email: string) {
    if (!this.connected)
      throw new ServerError(Status.UNAVAILABLE, "not connected");

    const user = await this.users.findOne({ email, isGuest: false });
    if (!user) return null;

    return user as IRegisteredUser;
  }

  async findUserById(userId: string) {
    if (!this.connected)
      throw new ServerError(Status.UNAVAILABLE, "not connected");

    const user = await this.users.findOne({ _id: userId });
    if (!user) return null;

    return user;
  }
}
