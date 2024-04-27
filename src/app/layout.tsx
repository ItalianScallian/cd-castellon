import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/navigation/Header';
import MatchProvider from '@/context/matchContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CD Castellón Match Data Visualization',
  description: 'Created by Romeo Scagliarini',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <MatchProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <div className='relative flex min-h-dvh flex-col'>
              <Header />
              <div className='flex overflow-y-auto overflow-hidden h-full'>
                <main
                  id='cdcastellon-main'
                  className='flex-1 relative px-6 h-full grow overflow-hidden overflow-y-auto py-2'
                >
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </MatchProvider>
      </body>
    </html>
  );
}
