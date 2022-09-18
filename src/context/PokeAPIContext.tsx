import { createContext, useContext, useState } from 'react';

import { PokeURL } from '../interfaces/PokeURLInfo';
import { PokeStatsInfo } from '../interfaces/PokeStatsInfo';

type PokeContext = {
  pokeLimit: number;
  pokeOffset: number;
  pokeSearchList: PokeURL[];
  pokeData: PokeStatsInfo[];
  pokeDataDelaySlice: number;
  isInfiniteScrollActive: boolean;
  homePageScrollYPosition: number;
  setPokelimit: React.Dispatch<React.SetStateAction<number>>;
  setPokeOffset: React.Dispatch<React.SetStateAction<number>>;
  setPokeSearchList: React.Dispatch<React.SetStateAction<PokeURL[]>>;
  setPokeData: React.Dispatch<React.SetStateAction<PokeStatsInfo[]>>;
  setPokeDataDelaySlice: React.Dispatch<React.SetStateAction<number>>;
  setHomePageScrollYPosition: React.Dispatch<React.SetStateAction<number>>;
  setIsInfiniteScrollActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const PokeAPIContext = createContext({} as PokeContext);
export const usePokeAPIContext = () => {
  return useContext(PokeAPIContext);
};

export const PokeAPIContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pokeLimit, setPokelimit] = useState(20);
  const [pokeOffset, setPokeOffset] = useState(0);
  const [pokeData, setPokeData] = useState<PokeStatsInfo[]>([]);
  const [pokeDataDelaySlice, setPokeDataDelaySlice] = useState(1);
  const [pokeSearchList, setPokeSearchList] = useState<PokeURL[]>([]);
  const [homePageScrollYPosition, setHomePageScrollYPosition] = useState(0);
  const [isInfiniteScrollActive, setIsInfiniteScrollActive] = useState(true);

  return (
    <PokeAPIContext.Provider
      value={{
        setPokeData,
        setPokelimit,
        setPokeOffset,
        setPokeSearchList,
        setPokeDataDelaySlice,
        setIsInfiniteScrollActive,
        setHomePageScrollYPosition,
        pokeData,
        pokeLimit,
        pokeOffset,
        pokeSearchList,
        pokeDataDelaySlice,
        isInfiniteScrollActive,
        homePageScrollYPosition,
      }}
    >
      {children}
    </PokeAPIContext.Provider>
  );
};
