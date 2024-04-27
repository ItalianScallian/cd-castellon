import { Pass, PlayerPassDetails } from '@/types';
import castellonData from '../../data/data.json';

interface AggregatedPassDetails {
  [key: string]: PlayerPassDetails[];
}

export default function valueAddedReceivers(matchId?: number) {
  const completedPasses = castellonData.passes.filter(
    (pass) =>
      (pass.match_id === matchId || matchId === undefined) &&
      pass.outcome_name === 'Complete' &&
      pass.pass_recipient_id !== null
  );

  const aggregatedPassDetails = completedPasses.reduce((acc: Record<string, PlayerPassDetails[]>, pass: Pass) => {
    const key = matchId ? `${pass.match_id}-${pass.team_id}` : `${pass.team_id}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    let playerDetail = acc[key].find((detail) => detail.player_id === pass.pass_recipient_id);
    if (playerDetail) {
      playerDetail.totalValueAdded += pass.obv_added;
    } else {
      acc[key].push({
        player_id: pass.pass_recipient_id!,
        player_name: pass.pass_recipient_name!,
        totalValueAdded: pass.obv_added,
        team_name: pass.team_name,
      });
    }
    return acc;
  }, {});

  // Sort the pass details for each key by totalValueAdded in descending order after flatmapping them for the data table
  const valueAddReceivers = Object.values(aggregatedPassDetails).flat();
  valueAddReceivers.sort(
    (a: { totalValueAdded: number }, b: { totalValueAdded: number }) => b.totalValueAdded - a.totalValueAdded
  );
  return valueAddReceivers;
}
