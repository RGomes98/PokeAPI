import { createContext, useContext, useState } from 'react';

import { PokeStatsInfo } from '../interfaces/PokeStatsInfo';

type PokeContext = {
  pokeLimit: number;
  pokeOffset: number;
  pokeData: PokeStatsInfo[];
  isInfiniteScrollActive: boolean;
  setPokelimit: React.Dispatch<React.SetStateAction<number>>;
  setPokeOffset: React.Dispatch<React.SetStateAction<number>>;
  setPokeData: React.Dispatch<React.SetStateAction<PokeStatsInfo[]>>;
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
  const [isInfiniteScrollActive, setIsInfiniteScrollActive] = useState<boolean>(true);

  return (
    <PokeAPIContext.Provider
      value={{
        setPokeData,
        setPokelimit,
        setPokeOffset,
        setIsInfiniteScrollActive,
        pokeData,
        pokeLimit,
        pokeOffset,
        isInfiniteScrollActive,
      }}
    >
      {children}
    </PokeAPIContext.Provider>
  );
};
