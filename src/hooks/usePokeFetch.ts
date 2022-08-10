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

  const OFFSET_INCREMENT = 20;
  const POKE_FETCH_LIMITER = 9;
  const POKE_DATA_MAX_SIZE = 820;
  const POKE_OFFSET_MAX_SIZE = 780;

  const {
    pokeLimit,
    pokeOffset,
    setPokeData,
    setPokelimit,
    setPokeOffset,
    setIsInfiniteScrollActive,
  } = usePokeAPIContext();

  const getPokes = async (): Promise<void> => {
    if (pokeOffset === POKE_DATA_MAX_SIZE) {
      return setIsInfiniteScrollActive(false);
    }

    pokeOffset === POKE_OFFSET_MAX_SIZE && setPokelimit(POKE_FETCH_LIMITER);

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
      setPokeOffset((prev) => prev + OFFSET_INCREMENT);
      setPokeData((prev) => [...prev, ...pokePromise]);
    } catch (err) {
      setIsPokeAPILoading(false);
    }
  };

  return { getPokes, isPokeAPILoading };
};
