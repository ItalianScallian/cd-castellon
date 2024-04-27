import valueAddedPassers from '@/services/valueAddedPassers';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import ValueAddedTable from '../tables/valueAddedTables/page';
import valueAddedReceivers from '@/services/valueAddedReceivers';

type HighestAddedValueCardProps = {
  valueType: string;
  currentMatch: string;
};

export default function HighestAddedValueCard({ valueType, currentMatch }: HighestAddedValueCardProps) {
  const highestValue =
    valueType === 'Passer'
      ? valueAddedPassers(currentMatch === 'all' || undefined ? undefined : parseInt(currentMatch))
      : valueAddedReceivers(currentMatch === 'all' || undefined ? undefined : parseInt(currentMatch));

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-md font-medium'>{`Highest Value Added ${valueType}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <ValueAddedTable data={highestValue} />
      </CardContent>
    </Card>
  );
}
