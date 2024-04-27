import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function PersonalHoverCard() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant='link'>Created by @romeoscagliarini</Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-80'>
        <div className='flex justify-between space-x-4'>
          <Avatar>
            <AvatarImage src='/profile-pic.jpeg' />
            <AvatarFallback>Romeo</AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <h4 className='text-sm font-semibold'>@ItalianScallian on Twitter</h4>
            <p className='text-sm'>Hope you enjoy this project!</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
