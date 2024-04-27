import commonPlayerCombinations from '@/services/mostCommonPlayerCombinations';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import PlayerCombinationTable from '../tables/playerCombinations/page';

type MostCommonPlayerCombinationsCardProps = {
  currentMatch: string;
};

export default function MostCommonPlayerCombinationCard({ currentMatch }: MostCommonPlayerCombinationsCardProps) {
  const combinations = commonPlayerCombinations(
    currentMatch === 'all' || undefined ? undefined : parseInt(currentMatch)
  );
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-md font-medium'>Most Common Player Combination</CardTitle>
      </CardHeader>
      <CardContent>
        <PlayerCombinationTable data={combinations} />
      </CardContent>
    </Card>
  );
}
