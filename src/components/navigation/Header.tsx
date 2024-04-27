import React from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';
import MatchSwitcher from './MatchSwitcher';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='flex-col md:flex sticky top-0 right-0 left-0 w-full shadow-lg z-10 bg-background border-b'>
      <div className='w-full flex space-between h-16 items-center justify-between px-4'>
        <Link href='/'>
          <div className='flex flex-row space-x-4 items-center'>
            <div className='w-12 h-12 relative overflow-hidden'>
              <Image
                src='/Logo_of_CD_Castellón.svg'
                alt='CD Castellón Logo'
                layout='fill'
                objectFit='contain'
                quality={100}
              />
            </div>
            CDCastellón Match Data
          </div>
        </Link>
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
