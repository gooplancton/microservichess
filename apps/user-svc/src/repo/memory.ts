import { IRegisteredUser, IUser, guestSchema, registeredUserSchema } from "types";
import { UserRepository } from "./base";
import { v4 as uuid4 } from "uuid"

export class MemoryUserRepository implements UserRepository {
    users: Map<string, IUser>

    constructor() {
        this.users = new Map()
    }

    async createGuest(username?: string) {
        const guest = guestSchema.parse({ username })
        this.users.set(guest._id, guest)

        return guest
    }

    async findUserByEmail(email: string): Promise<IRegisteredUser | null> {
        const user = Array.from(this.users.values()).find(u => !u.isGuest && u.email === email)
        if (!user) return null

        return user as IRegisteredUser
    }

    async createUser(username: string, email: string, passwordHash: string, hashSalt: string) {
        const _id = uuid4()
        const user = registeredUserSchema.parse({ _id, username, email, hashSalt, passwordHash })

        this.users.set(_id, user)

        return user
    }

    async findUserById(userId: string): Promise<IUser | null> {
        const user = this.users.get(userId)
        if (!user) return null

        return user
    }
}
