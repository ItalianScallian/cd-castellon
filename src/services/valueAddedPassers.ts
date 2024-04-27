import { Pass, PlayerPassDetails } from '@/types';
import castellonData from '../../data/data.json';

export default function valueAddedPassers(matchId?: number) {
  const completedPasses = castellonData.passes.filter(
    (pass) => (pass.match_id === matchId || matchId === undefined) && pass.outcome_name === 'Complete'
  );

  const aggregatedPassDetails = completedPasses.reduce((acc: Record<string, PlayerPassDetails[]>, pass: Pass) => {
    const key = matchId ? `${pass.match_id}-${pass.team_id}` : `${pass.team_id}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    let playerDetail = acc[key].find((detail) => detail.player_id === pass.player_id);
    if (playerDetail) {
      playerDetail.totalValueAdded += pass.obv_added;
    } else {
      acc[key].push({
        player_id: pass.player_id,
        player_name: pass.player_name,
        team_name: pass.team_name,
        totalValueAdded: pass.obv_added,
      });
    }
    return acc;
  }, {});

  // Sort the pass details for each key by totalValueAdded in descending order after flatmapping them for the data table
  const valueAddPassers = Object.values(aggregatedPassDetails).flat();
  valueAddPassers.sort(
    (a: { totalValueAdded: number }, b: { totalValueAdded: number }) => b.totalValueAdded - a.totalValueAdded
  );
  return valueAddPassers;
}
