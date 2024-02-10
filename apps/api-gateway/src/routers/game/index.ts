import { router } from "../../trpc";
import { join } from "./join";
import { makeMove } from "./make-move";
import { info } from "./info";
import { draw } from "./draw";
import { forfeit } from "./forfeit";

export const gameRouter = router({
  join,
  makeMove,
  info,
  draw,
  forfeit,
});
