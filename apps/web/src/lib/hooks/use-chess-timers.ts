import { useState, useEffect } from "react";

export function useChessTimers() {

  const [playerTime, setPlayerTime] = useState(Infinity);
  const [opponentTime, setOpponentTime] = useState(Infinity);
  const [currentTimer, setCurrentTimer] = useState<"player" | "opponent">();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      if (currentTimer === 'player') {
        setPlayerTime((prev) => prev - 1);
      } else if (currentTimer === 'opponent') {
        setOpponentTime((prev) => prev - 1);
      } else {
        clearInterval(interval)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, currentTimer]);

  return {
    playerTime,
    opponentTime,
    setPlayerTime,
    setOpponentTime,
    currentTimer,
    setCurrentTimer,
    isActive,
    setIsActive,
  };
};
