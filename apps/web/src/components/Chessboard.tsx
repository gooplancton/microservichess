import React from "react";
import { Chessboard as BareChessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useGameContext } from "../lib/context/game-context";

type ChessboardProps = React.ComponentProps<typeof BareChessboard> & {
  submitMove: (move: string) => void;
};

export function Chessboard(props: ChessboardProps) {
  const gameContext = useGameContext();
  const game = new Chess(gameContext.fen);

  const onPieceDrop = (from: string, to: string, _piece: string) => {
    try {
      const move = game.move({ from, to });
      if (!move) return false;
      props.submitMove(move.san);
      gameContext.addMove(move.san, game.fen());

      return true;
    } catch {
      return false;
    }
  };

  return (
    <BareChessboard
      {...props}
      boardOrientation={gameContext.side}
      position={gameContext.fen}
      onPieceDrop={onPieceDrop}
      isDraggablePiece={(args) => {
        const piece = game.get(args.sourceSquare);
        return gameContext.side.startsWith(piece.color);
      }}
    />
  );
}
