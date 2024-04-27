import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import SoccerPitch from '../charts/SoccerPitch';
import castellonData from '../../../data/data.json';
import { match } from 'assert';

type ChartCardProps = {
  currentMatch: string;
};

export default function ChartCard({ currentMatch }: ChartCardProps) {
  const matchId = currentMatch === 'all' || undefined ? undefined : parseInt(currentMatch);
  const match = castellonData.matches.find((m) => m.match_id === matchId);
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-md font-medium'>
          {match ? `${match?.away_team_name} @ ${match?.home_team_name} on ${match?.match_date}` : 'All Matches'}
        </CardTitle>
      </CardHeader>
      <CardContent className='relative justify-center'>
        <SoccerPitch matchId={matchId} />
      </CardContent>
    </Card>
  );
}
