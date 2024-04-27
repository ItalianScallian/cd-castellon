import castellonData from '../../data/data.json';

export function countPassesAndValue(
  teamName?: string,
  matchId?: number
): { passCount: Map<number, number>; passValue: Map<number, number> } {
  const passCount = new Map<number, number>();
  const passValue = new Map<number, number>();

  const passes = castellonData.passes.filter(
    (pass) => (pass.match_id === matchId || matchId === undefined) && (pass.team_name === teamName || teamName === '')
  );
  passes.forEach((pass) => {
    passCount.set(pass.player_id, (passCount.get(pass.player_id) || 0) + 1);
    passValue.set(pass.player_id, (passValue.get(pass.player_id) || 0) + pass.obv_added);
  });

  return { passCount, passValue };
}
