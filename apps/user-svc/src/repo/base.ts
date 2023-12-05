import { IGuest, IRegisteredUser } from "types"

export interface UserRepository {
    createUser(username: string, email: string, password: string): Promise<IRegisteredUser>
    createGuest(username?: string): Promise<IGuest>
    findUserByEmail(email: string): Promise<IRegisteredUser | undefined>
}