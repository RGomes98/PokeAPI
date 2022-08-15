import { createContext, useContext, useState } from 'react';

import { PokeStatsInfo } from '../interfaces/PokeStatsInfo';

type PokeContext = {
  pokeLimit: number;
  pokeOffset: number;
  pokeData: PokeStatsInfo[];
  isInfiniteScrollActive: boolean;
  homePageScrollYPosition: number;
  setPokelimit: React.Dispatch<React.SetStateAction<number>>;
  setPokeOffset: React.Dispatch<React.SetStateAction<number>>;
  setPokeData: React.Dispatch<React.SetStateAction<PokeStatsInfo[]>>;
  setHomePageScrollYPosition: React.Dispatch<React.SetStateAction<number>>;
  setIsInfiniteScrollActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const PokeAPIContext = createContext({} as PokeContext);
export const usePokeAPIContext = () => {
  return useContext(PokeAPIContext);
};

export const PokeAPIContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pokeLimit, setPokelimit] = useState<number>(20);
  const [pokeOffset, setPokeOffset] = useState<number>(0);
  const [pokeData, setPokeData] = useState<PokeStatsInfo[]>([]);
  const [homePageScrollYPosition, setHomePageScrollYPosition] = useState<number>(0);
  const [isInfiniteScrollActive, setIsInfiniteScrollActive] = useState<boolean>(true);

  return (
    <PokeAPIContext.Provider
      value={{
        setPokeData,
        setPokelimit,
        setPokeOffset,
        setIsInfiniteScrollActive,
        setHomePageScrollYPosition,
        pokeData,
        pokeLimit,
        pokeOffset,
        isInfiniteScrollActive,
        homePageScrollYPosition,
      }}
    >
      {children}
    </PokeAPIContext.Provider>
  );
};
