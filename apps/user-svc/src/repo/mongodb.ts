import { UserRepository } from "./base"
import { MongoClient, Collection } from "mongodb"
import { IRegisteredUser, IUser, guestSchema, registeredUserSchema, userSchema } from "types"
import { ServerError, Status } from "nice-grpc"

export class MongoDBUserRepository implements UserRepository {
    connected: boolean = false
    users: Collection<IUser>

    constructor(url: string) {
        const client = new MongoClient(url)
        client.connect().then(() => this.connected = true)

        this.users = client.db().collection<IUser>("users")
    }

    async createUser(username: string, email: string, passwordHash: string, hashSalt: string) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

        const user = registeredUserSchema.parse({ username, email, hashSalt, passwordHash })

        await this.users.insertOne(user)

        return user
    }

    async createGuest(username?: string | undefined) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

        const guest = guestSchema.parse({ username })

        await this.users.insertOne(guest)

        return guest
    }

    async findUserByEmail(email: string) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

        const user = await this.users.findOne({ email, isGuest: false })
        if (!user) return null

        return user as IRegisteredUser
    }

    async findUserById(userId: string) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")
        
        const user = await this.users.findOne({ _id: userId })
        if (!user) return null

        return user
    }
}
