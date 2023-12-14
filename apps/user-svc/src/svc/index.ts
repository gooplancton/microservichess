import type { AuthResponseMessage, GetUserMessage, GuestAuthRequestMessage, UserLoginRequestMessage, UserRecordMessage, UserServiceImplementation, UserSignupRequestMessage } from "protobufs/dist/user_svc"
import { UserRepository } from "../repo";
import { hash } from "bcrypt"

export class UserService implements UserServiceImplementation {
    repo: UserRepository

    constructor(repo: UserRepository) {
        this.repo = repo
    }

    async userLogin(request: UserLoginRequestMessage): Promise<AuthResponseMessage> {
        const user = await this.repo.findUserByEmail(request.email)
        if (!user) throw new Error("user not found")

        const passwordHash = await hash(request.password, user.passwordHash)
        if (passwordHash !== user.passwordHash) throw new Error("incorrect password")

        const res = {
            userId: user._id
        }

        return res
    }


    async guestLogin(request: GuestAuthRequestMessage): Promise<AuthResponseMessage> {
        const guest = await this.repo.createGuest(request.username)

        const res = {
            userId: guest._id
        }

        return res
    }

    async userSignup(request: UserSignupRequestMessage): Promise<AuthResponseMessage> {
        const user = await this.repo.createUser(request.username, request.email, request.password)

        const res = {
            userId: user._id
        }

        return res
    }

    async getUser(request: GetUserMessage): Promise<UserRecordMessage> {
        const user = await this.repo.findUserById(request.userId)
        if (!user) throw new Error("could not find user")

        const res: UserRecordMessage = {
            userId: user._id,
            isGuest: user.isGuest,
            username: user.username,
            email: user.isGuest ? undefined : user.email
        }

        return res
    }
}
