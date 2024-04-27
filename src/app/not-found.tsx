import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-1 items-center p-24 flex-col space-y-4'>
      <h1 className='text-2xl'>{'This is not the page you are looking for...'}</h1>
      <Button>
        <Link href='/'>Return Home</Link>
      </Button>
    </div>
  );
}
