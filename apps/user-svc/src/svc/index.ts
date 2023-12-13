import { handleUnaryCall } from "@grpc/grpc-js";
import { AuthResponseMessage, GetUserMessage, GuestAuthRequestMessage, UserLoginRequestMessage, UserRecordMessage, UserServiceServer, UserSignupRequestMessage } from "protobufs/dist/user_svc"
import { UserRepository } from "../repo";
import { hash } from "bcrypt"

export class UserService implements UserServiceServer {
    [k: string]: any

    repo: UserRepository

    constructor(repo: UserRepository) {
        this.repo = repo
    }

    private async _userLogin(request: UserLoginRequestMessage): Promise<AuthResponseMessage> {
        const user = await this.repo.findUserByEmail(request.email)
        if (!user) throw new Error("user not found")

        const passwordHash = await hash(request.password, user.passwordHash)
        if (passwordHash !== user.passwordHash) throw new Error("incorrect password")

        const res = {
            userId: user._id
        }

        return res
    }

    public userLogin: handleUnaryCall<UserLoginRequestMessage, AuthResponseMessage> = (call, callback) => {
        this._userLogin(call.request)
            .then(res => callback(null, res))
            .catch(err => callback({ code: 3, message: err }))
    }

    private async _guestLogin(request: GuestAuthRequestMessage): Promise<AuthResponseMessage> {
        const guest = await this.repo.createGuest(request.username)

        const res = {
            userId: guest._id
        }

        return res
    }

    guestLogin: handleUnaryCall<GuestAuthRequestMessage, AuthResponseMessage> = (call, callback) => {
        this._guestLogin(call.request)
            .then(res => callback(null, res))
            .catch(err => callback({ code: 3, message: err }))
    }

    private async _userSignup(request: UserSignupRequestMessage): Promise<AuthResponseMessage> {
        const user = await this.repo.createUser(request.username, request.email, request.password)

        const res = {
            userId: user._id
        }

        return res
    }

    userSignup: handleUnaryCall<UserSignupRequestMessage, AuthResponseMessage> = (call, callback) => {
        this._userSignup(call.request)
            .then(res => callback(null, res))
            .catch(err => callback({ code: 3, message: err }))
    }

    private async _getUser(request: GetUserMessage): Promise<UserRecordMessage> {
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

    getUser: handleUnaryCall<GetUserMessage, UserRecordMessage> = (call, callback) => {
        this._getUser(call.request)
            .then(res => callback(null, res))
            .catch(err => callback({ code: 3, message: err }))
    }
}
