import { router } from "../../trpc";
import { join } from "./join";
import { makeMove } from "./make-move";
import { list } from "./list";
import { info } from "./info";
import { askDraw } from "./ask-draw";
import { acceptDraw } from "./accept-draw";
import { forfeit } from "./forfeit";

export const gameRouter = router({
  join,
  makeMove,
  list,
  info,
  askDraw,
  acceptDraw,
  forfeit,
});
