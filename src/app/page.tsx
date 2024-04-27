'use client';
import HighestAddedValueCard from '@/components/cards/highestAddedValueCard';
import MostCommonPlayerCombinationCard from '@/components/cards/mostCommonPlayerCombinationsCard';
import { useMatches } from '@/context/matchContext';

export default function Home() {
  const { currentMatch } = useMatches();
  return (
    <div className='w-full mx-auto p-4'>
      <div className='grid gap-4 md:grid-cols-2 md:gap-8 mb-4'>
        <HighestAddedValueCard valueType='Passer' currentMatch={currentMatch} />
        <HighestAddedValueCard valueType='Receiver' currentMatch={currentMatch} />
      </div>
      <MostCommonPlayerCombinationCard currentMatch={currentMatch} />
    </div>
  );
}
