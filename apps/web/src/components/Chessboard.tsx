import React from "react";
import { Chessboard as BareChessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useGameContext } from "../lib/context/game-context";

type ChessboardProps = React.ComponentProps<typeof BareChessboard> & {
  fen: string;
  side: "white" | "black";
  submitMove: (move: string) => void;
};

export function Chessboard(props: ChessboardProps) {
  const game = new Chess(props.fen);
  const optimisticallyUpdateState = useGameContext(
    (state) => state.optimisticallyUpdateStateAfterMove,
  );

  const onPieceDrop = (from: string, to: string, piece: string) => {
    try {
      const promotionPieceMatch = piece.toLowerCase().match(/(b|w)(q|n|r|b)/)
      const promotionPiece = promotionPieceMatch ? promotionPieceMatch[2] : undefined
      const move = game.move({ from, to, promotion: promotionPiece });
      if (!move) return false;
      props.submitMove(move.san);
      optimisticallyUpdateState(game.fen());

      return true;
    } catch {
      return false;
    }
  };

  return (
    <BareChessboard
      {...props}
      boardOrientation={props.side}
      position={props.fen}
      onPieceDrop={onPieceDrop}
      isDraggablePiece={(args) => {
        const piece = game.get(args.sourceSquare);
        return props.side.startsWith(piece.color);
      }}
    />
  );
}
