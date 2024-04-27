'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CommandList } from 'cmdk';
import { useMatches } from '@/context/matchContext';

export default function MatchSwitcher() {
  const { currentMatch, matches, selectCurrentMatch } = useMatches();
  const [open, setOpen] = useState(false);
  const matchUIElements = matches.map((match) => ({
    value: `${match.match_id}`,
    label:
      match.home_team_id === 1787
        ? `${match.away_team_name} - ${match.match_date}`
        : `@ ${match.home_team_name} - ${match.match_date}`,
  }));
  matchUIElements.push({ value: 'all', label: 'All Matches' });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a match'
          className='w-[175px] md:w-[400px] justify-between'
        >
          {currentMatch ? matchUIElements.find((match) => match.value === currentMatch)?.label : 'Select Match...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[400px] p-0'>
        <Command>
          <CommandList>
            <CommandEmpty>No Matches found.</CommandEmpty>
            <CommandGroup>
              {matchUIElements.map((match) => (
                <CommandItem
                  key={match.value}
                  value={match.value}
                  onSelect={(currentValue: string) => {
                    selectCurrentMatch(currentValue === currentMatch ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', currentMatch === match.value ? 'opacity-100' : 'opacity-0')} />
                  {match.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
