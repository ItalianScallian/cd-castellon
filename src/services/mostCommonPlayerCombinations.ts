import { Pass } from '@/types';
import castellonData from '../../data/data.json';

interface Combination {
  count: number;
  totalValueAdded: number;
  team_name: string;
  passer_id: number;
  passer_name: string;
  recipient_id: number;
  recipient_name: string;
}

interface CombinationResults {
  mostCommon: Combination[];
  mostFruitful: Combination[];
}

type CombinationMap = Record<string, Combination>;

function analyzePlayerCombinations(passes: Pass[]): Combination[] {
  const combinations: CombinationMap = {};

  passes.forEach((pass) => {
    const key = `${pass.player_id}-${pass.pass_recipient_id}`;

    if (combinations[key]) {
      combinations[key].count += 1;
      combinations[key].totalValueAdded += pass.obv_added;
    } else {
      combinations[key] = {
        count: 1,
        totalValueAdded: pass.obv_added,
        passer_id: pass.player_id,
        passer_name: pass.player_name,
        recipient_id: pass.pass_recipient_id!,
        recipient_name: pass.pass_recipient_name!,
        team_name: pass.team_name,
      };
    }
  });

  return Object.values(combinations).flat();
}

export default function commonPlayerCombinations(matchId?: number) {
  const completedPasses = castellonData.passes.filter(
    (pass) =>
      (pass.match_id === matchId || matchId === undefined) &&
      pass.outcome_name === 'Complete' &&
      pass.pass_recipient_id !== null
  );
  const combinations = analyzePlayerCombinations(completedPasses);
  const result = combinations.sort((a,b) => b.count-a.count)

  return result;
}
