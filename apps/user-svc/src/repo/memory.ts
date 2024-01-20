import { GuestInput, IRegisteredUser, IUser, RegisteredUserInput, guestSchema, registeredUserSchema } from "types";
import { UserRepository } from "./base";
import { v4 as uuid4 } from "uuid"
import { genSalt, hash } from "bcrypt"
import { ServerError, Status } from "nice-grpc";

type UserId = string

export class MemoryUserRepository implements UserRepository {
    users: Map<UserId, IUser>

    constructor() {
        this.users = new Map()
    }

    async createGuest(username?: string | undefined) {
        const _id = uuid4()
        const guest = guestSchema.parse({ _id, username } as GuestInput)
        this.users.set(_id, guest)

        return guest
    }

    async findUserByEmail(username: string) {
        const user = Array.from(this.users.values()).find(u => !u.isGuest && u.email === username) as IRegisteredUser

        return user
    }

    async createUser(username: string, email: string, passwordHash: string, hashSalt: string) {
        const _id = uuid4()
        const user = registeredUserSchema.parse({ _id, username, email, hashSalt, passwordHash })

        this.users.set(_id, user)

        return user
    }

    async findUserById(userId: string): Promise<IUser | undefined> {
        const user = this.users.get(userId)
        return user
    }
}
