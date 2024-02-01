import type { userProtos } from "protobufs";
import { UserRepository } from "../repo";
import { genSalt, hash } from "bcrypt";
import { ServerError, Status } from "nice-grpc";
import { guestSchema, registeredUserSchema } from "types";

export class UserService implements userProtos.UserServiceImplementation {
  repo: UserRepository;

  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  async userLogin(
    request: userProtos.UserLoginRequest,
  ): Promise<userProtos.UserIdMsg> {
    const user = await this.repo.findUserByEmail(request.email);
    if (!user) throw new ServerError(Status.INVALID_ARGUMENT, "user not found");

    const passwordHash = await hash(request.password, user.passwordHash);
    if (passwordHash !== user.passwordHash)
      throw new ServerError(Status.INVALID_ARGUMENT, "incorrect password");

    const res = {
      userId: user._id,
    };

    return res;
  }

  async guestLogin(
    request: userProtos.GuestUsernameMsg,
  ): Promise<userProtos.UserIdMsg> {
    const guest = guestSchema.parse({ username: request.username });
    await this.repo.createGuest(guest);

    const res = {
      userId: guest._id,
    };

    return res;
  }

  async userSignup(
    request: userProtos.UserSignupRequest,
  ): Promise<userProtos.UserIdMsg> {
    const emailAvailable = !(await this.repo.findUserByEmail(request.email));
    if (!emailAvailable)
      throw new ServerError(Status.INVALID_ARGUMENT, "email already taken");

    const hashSalt = await genSalt();
    const passwordHash = await hash(request.password, hashSalt);
    const user = registeredUserSchema.parse({
      username: request.username,
      email: request.email,
      hashSalt,
      passwordHash,
    });

    await this.repo.createUser(user);

    const res = {
      userId: user._id,
    };

    return res;
  }

  async getUserInfo(
    request: userProtos.UserIdMsg,
  ): Promise<userProtos.GetUserInfoResponse> {
    const user = await this.repo.findUserById(request.userId);
    if (!user)
      throw new ServerError(Status.INVALID_ARGUMENT, "could not find user");

    const res: userProtos.GetUserInfoResponse = {
      isGuest: user.isGuest,
      username: user.username,
      email: user.isGuest ? undefined : user.email,
    };

    return res;
  }
}
