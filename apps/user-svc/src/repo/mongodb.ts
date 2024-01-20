import { UserRepository } from "./base"
import { MongoClient, Collection, ObjectId } from "mongodb"
import { IRegisteredUser, IUser, guestSchema, registeredUserSchema } from "../../../../packages/types/src"
import { ServerError, Status } from "nice-grpc"

export class MongoDBUserRepository implements UserRepository {
    connected: boolean
    users: Collection<IUser>

    constructor(url: string) {
        const client = new MongoClient(url)
        client.connect().then(() => this.connected = true)

        this.users = client.db().collection("users")
    }

    async createUser(username: string, email: string, passwordHash: string, hashSalt: string) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

        const _id = new ObjectId()
        const user = registeredUserSchema.parse({ _id, username, email, hashSalt, passwordHash })

        await this.users.insertOne(user)

        return user
    }

    async createGuest(username?: string | undefined) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

        const _id = new ObjectId()
        const guest = guestSchema.parse({ _id, username })

        await this.users.insertOne(guest)

        return guest
    }

    async findUserByEmail(email: string) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

        const user = await this.users.findOne({ email, isGuest: false }) as IRegisteredUser

        return user ?? undefined
    }

    async findUserById(userId: string) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")
        
        const user = await this.users.findOne({ _id: new ObjectId(userId), isGuest: false })

        return user ?? undefined
    }
}