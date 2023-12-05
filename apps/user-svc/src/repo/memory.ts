import { IRegisteredUser, IUser, guestSchema, registeredUserSchema } from "types";
import { UserRepository } from "./base";
import { v4 as uuid4 } from "uuid"
import { genSalt, hash } from "bcrypt"

export class MemoryUserRepository implements UserRepository {
    users: Map<string, IUser>

    constructor() {
        this.users = new Map()
    }

    async createGuest(username?: string | undefined) {
        const _id = uuid4()
        const guest = guestSchema.parse({ _id, username })
        this.users.set(_id, guest)

        return guest
    }

    async findUserByEmail(username: string) {
        const user = Array.from(this.users.values()).find(u => !u.isGuest && u.email === username) as IRegisteredUser

        return user
    }

    async createUser(username: string, email: string, password: string) {
        const emailAvailable = !(await this.findUserByEmail(email))
        if (!emailAvailable) throw new Error("email already taken")

        const _id = uuid4()
        const hashSalt = await genSalt()
        const passwordHash = await hash(password, hashSalt) 
        const user = registeredUserSchema.parse({ _id, username, email, hashSalt, passwordHash })

        this.users.set(_id, user)

        return user
    }
}