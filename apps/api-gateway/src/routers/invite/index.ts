import { router } from "../../trpc";
import { create } from "./create"
import { consume } from "./consume"
import { wait } from "./wait"

export const inviteRouter = router({
	create,
	consume,
	wait
})
