'use client';

import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { XIcon } from 'lucide-react';
import { DataTableViewOptions } from './view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-4'>
        <Input
          placeholder='Filter Team...'
          value={(table.getColumn('team_name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('team_name')?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <Input
          placeholder='Filter Passer...'
          value={(table.getColumn('passer_name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('player_name')?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <Input
          placeholder='Filter Receiver...'
          value={(table.getColumn('passer_name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('player_name')?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {isFiltered && (
          <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
            Reset
            <XIcon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
