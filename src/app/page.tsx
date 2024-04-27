'use client';
import HighestAddedValueCard from '@/components/cards/highestAddedValueCard';
import MostCommonPlayerCombinationCard from '@/components/cards/mostCommonPlayerCombinationsCard';
import { useMatches } from '@/context/matchContext';
import PersonalHoverCard from '@/components/cards/personalHoverCard';
import { Suspense } from 'react';
import ChartCard from '@/components/cards/chartCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const { currentMatch } = useMatches();
  return (
    <div className='mx-auto p-4 space-y-6'>
      <Tabs defaultValue='tables'>
        <TabsList>
          <TabsTrigger value='tables'>Tables</TabsTrigger>
          <TabsTrigger value='charts'>Pass Map</TabsTrigger>
        </TabsList>
        <TabsContent value='tables'>
          <div className='grid gap-4 md:grid-cols-2 md:gap-8 mb-4'>
            <HighestAddedValueCard valueType='Passer' currentMatch={currentMatch} />
            <HighestAddedValueCard valueType='Receiver' currentMatch={currentMatch} />
          </div>
          <MostCommonPlayerCombinationCard currentMatch={currentMatch} />
        </TabsContent>
        <TabsContent value='charts'>
          <Suspense fallback={<div className='h-64 bg-gray-300 animate-pulse rounded-lg shadow-lg'></div>}>
            <div className='flex flex-col'>
              <div>
                <ChartCard currentMatch={currentMatch} />
              </div>
            </div>
          </Suspense>
        </TabsContent>
      </Tabs>
      <PersonalHoverCard />
    </div>
  );
}
