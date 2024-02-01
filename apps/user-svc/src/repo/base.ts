import { IGuest, IRegisteredUser, IUser } from "types"

export interface UserRepository {
    createUser(username: string, email: string, passwordHash: string, hashSalt: string): Promise<IRegisteredUser>
    createGuest(username?: string): Promise<IGuest>
    findUserByEmail(email: string): Promise<IRegisteredUser | null>
    findUserById(userId: string): Promise<IUser | null>
}
