import { router } from "../../trpc"
import { loginUser } from "./login-user"
import { loginGuest } from "./login-guest"
import { signupUser } from "./signup-user"
import { me } from "./me"

export const userRouter = router({
	loginUser,
	loginGuest,
	signupUser,
	me
})
