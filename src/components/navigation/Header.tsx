import React from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';
import MatchSwitcher from './MatchSwitcher';

const Header = () => {
  return (
    <div className='flex-col md:flex sticky top-0 right-0 left-0 w-full shadow-lg z-10 bg-background border-b'>
      <div className='w-full flex space-between h-16 items-center justify-between px-4'>
        <div>{'CD Castellon Match Data'}</div>
        <div className='w-1/3'>
          <MatchSwitcher />
        </div>
        <div className='flex items-center space-x-4 justify-end'>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
