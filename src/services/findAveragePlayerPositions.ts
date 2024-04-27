import castellonData from '../../data/data.json';

function findAveragePlayerPositions(
  matchId?: number,
  teamName?: string
): Record<number, { avgX: number; avgY: number }> {
  const playerPositions: Record<number, { sumX: number; sumY: number; count: number }> = {};

  // Filter passes based on matchId and teamName
  const filteredPasses = castellonData.passes.filter(
    (pass) =>
      (pass.match_id === matchId || matchId === undefined) &&
      (pass.team_name === teamName || teamName === '') &&
      pass.outcome_name === 'Complete' &&
      pass.pass_recipient_id !== null
  );

  // Aggregate pass start and end positions for each player
  filteredPasses.forEach((pass) => {
    // Handle pass origin
    if (!playerPositions[pass.player_id]) {
      playerPositions[pass.player_id] = { sumX: 0, sumY: 0, count: 0 };
    }
    playerPositions[pass.player_id].sumX += pass.location_x;
    playerPositions[pass.player_id].sumY += pass.location_y;
    playerPositions[pass.player_id].count++;

    // Handle pass destination
    if (!playerPositions[pass.pass_recipient_id!]) {
      playerPositions[pass.pass_recipient_id!] = { sumX: 0, sumY: 0, count: 0 };
    }
    playerPositions[pass.pass_recipient_id!].sumX += pass.pass_end_location_x;
    playerPositions[pass.pass_recipient_id!].sumY += pass.pass_end_location_y;
    playerPositions[pass.pass_recipient_id!].count++;
  });

  // Compute average positions for each player
  const averagePositions: Record<number, { avgX: number; avgY: number }> = {};
  Object.keys(playerPositions).forEach((playerId) => {
    // @ts-ignore
    const p = playerPositions[playerId];
    // @ts-ignore
    averagePositions[playerId] = {
      avgX: p.sumX / p.count,
      avgY: p.sumY / p.count,
    };
  });

  return averagePositions;
}

export default findAveragePlayerPositions;
