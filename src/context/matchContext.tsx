'use client';
import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react';
import castellonData from '../../data/data.json';
import { Match } from '@/types';

// Define the type for the context state
export interface MatchContextType {
  currentMatch: string;
  matches: Match[];
  selectCurrentMatch(matchId: string): void;
}

type MatchProviderProps = {
  children: ReactNode;
};

// Create the context
export const MatchContext = createContext<MatchContextType>({
  currentMatch: 'all',
  matches: [],
  selectCurrentMatch: () => {},
});

// Create a Provider component
const MatchProvider = ({ children }: MatchProviderProps) => {
  const [currentMatch, setCurrentMatch] = useState('all');
  const matches = castellonData.matches;
  const selectCurrentMatch = useCallback(
    (selectedMatchId: string) => {
      setCurrentMatch(selectedMatchId);
    },
    [setCurrentMatch]
  );

  const value = useMemo(
    () => ({
      currentMatch,
      matches,
      selectCurrentMatch,
    }),
    [currentMatch, matches, selectCurrentMatch]
  );
  return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>;
};

// Custom hook to use the context
export const useMatches = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatchContext must be used within a AppProvider');
  }
  return context;
};

export default MatchProvider;
