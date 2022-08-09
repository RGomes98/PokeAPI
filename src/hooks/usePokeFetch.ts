import { useState } from 'react';

import { axiosAPI } from '../services/axiosAPI';
import { PokeURLInfo } from '../interfaces/PokeURLInfo';
import { PokeStatsInfo } from '../interfaces/PokeStatsInfo';
import { usePokeAPIContext } from '../context/PokeAPIContext';

type usePokeAPIReturn = {
  isPokeAPILoading: boolean;
  getPokes: () => Promise<void>;
};

export const usePokeFetch = (): usePokeAPIReturn => {
  const [isPokeAPILoading, setIsPokeAPILoading] = useState<boolean>(false);

  const pokeFetchLimiter = 9;
  const offsetIncrement = 20;
  const pokeDataMaxSize = 820;
  const pokeOffsetMaxSize = 780;

  const {
    pokeLimit,
    pokeOffset,
    setPokeData,
    setPokelimit,
    setPokeOffset,
    setIsInfiniteScrollActive,
  } = usePokeAPIContext();

  const getPokes = async (): Promise<void> => {
    if (pokeOffset === pokeDataMaxSize) {
      return setIsInfiniteScrollActive(false);
    }

    pokeOffset === pokeOffsetMaxSize && setPokelimit(pokeFetchLimiter);

    setIsPokeAPILoading(true);
    try {
      const {
        data: { results: pokeURL },
      } = await axiosAPI.get<PokeURLInfo>(`pokemon/?limit=${pokeLimit}&offset=${pokeOffset}`);
      const pokePromise = await Promise.all<PokeStatsInfo>(
        pokeURL.map(async (poke) => {
          const { data: pokeData } = await axiosAPI.get<PokeStatsInfo>(`${poke.url}`);
          return pokeData;
        })
      );
      setIsPokeAPILoading(false);
      setPokeOffset((prev) => prev + offsetIncrement);
      setPokeData((prev) => [...prev, ...pokePromise]);
    } catch (err) {
      setIsPokeAPILoading(false);
    }
  };

  return { getPokes, isPokeAPILoading };
};
