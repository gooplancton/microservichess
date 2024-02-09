import { router } from "../../trpc";
import { create } from "./create";
import { consume } from "./consume";
import { invalidate } from "./invalidate";
import { wait } from "./wait";

export const inviteRouter = router({
  create,
  consume,
  wait,
  invalidate
});
