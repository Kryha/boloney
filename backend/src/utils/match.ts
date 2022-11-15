export const getNextPlayerId = (currentPlayerId: string, playerOrder: string[]): string => {
  const currentPlayerIndex = playerOrder.indexOf(currentPlayerId);
  const isLast = playerOrder.length - 1 === currentPlayerIndex;
  const nextPlayerIndex = isLast ? 0 : currentPlayerIndex + 1;
  return playerOrder[nextPlayerIndex];
};

export const getOtherPresences = (currentPlayerId: string, presences: Record<string, nkruntime.Presence>): nkruntime.Presence[] => {
  return Object.entries(presences)
    .filter((presenceRecord) => presenceRecord[0] !== currentPlayerId)
    .map((presenceRecord) => presenceRecord[1]);
};
