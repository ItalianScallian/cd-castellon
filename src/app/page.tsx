'use client';
import HighestAddedValueCard from '@/components/cards/highestAddedValueCard';
import MostCommonPlayerCombinationCard from '@/components/cards/mostCommonPlayerCombinationsCard';
import PassMap from '@/components/charts/pass-map';
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs';
import { useMatches } from '@/context/matchContext';

export default function Home() {
  const { currentMatch } = useMatches();
  return (
    <div className='w-full mx-auto p-4'>
      <Tabs defaultValue='tables'>
        <TabsList className='grid w-1/4 grid-cols-2'>
          <TabsTrigger value='tables'>Tables</TabsTrigger>
          <TabsTrigger value='charts'>Charts</TabsTrigger>
        </TabsList>
        <TabsContent value='tables'>
          <div className='grid gap-4 md:grid-cols-2 md:gap-8 mb-4'>
            <HighestAddedValueCard valueType='Passer' currentMatch={currentMatch} />
            <HighestAddedValueCard valueType='Receiver' currentMatch={currentMatch} />
          </div>
          <MostCommonPlayerCombinationCard currentMatch={currentMatch} />
        </TabsContent>
        <TabsContent value='charts'>
          <div className='grid gap-4 md:grid-cols-2 md:gap-8 mb-4'>
            <div>
              <PassMap />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
