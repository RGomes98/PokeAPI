import { useState, useEffect } from 'react';

import { axiosAPI } from '../services/axiosAPI';
import { PokeStatsInfo } from '../interfaces/PokeStatsInfo';
import { usePokeAPIContext } from '../context/PokeAPIContext';
import { PokeURL, PokeURLInfo } from '../interfaces/PokeURLInfo';

type usePokeSearchReturn = {
  isPokeSearchErr: boolean;
  pokeSearchResponse: PokeStatsInfo[];
};

export const usePokeSearch = (pokeArr: PokeURL[], pokeSearchInput: string): usePokeSearchReturn => {
  const { pokeSearchList, setPokeSearchList } = usePokeAPIContext();

  const [isPokeSearchErr, setIsPokeSearchErr] = useState(false);
  const [pokeSearchResponse, setPokeSearchResponse] = useState<PokeStatsInfo[]>([]);

  const pokeListSize: number = 898;

  const getPokeSearchList = async (listSize: number): Promise<void> => {
    try {
      const {
        data: { results },
      } = await axiosAPI.get<PokeURLInfo>(`pokemon/?limit=${listSize}&offset=0`);
      setPokeSearchList(results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    !pokeSearchList.length && getPokeSearchList(pokeListSize);
  });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    (async (pokeArr, signal: AbortSignal): Promise<void> => {
      if (!pokeArr.length && pokeSearchInput) {
        setIsPokeSearchErr(true);
        return setPokeSearchResponse([]);
      }

      try {
        const fetchedPokeList = await Promise.all(
          pokeArr.map(async ({ url }) => {
            const { data } = await axiosAPI.get<PokeStatsInfo>(`${url}`, {
              signal,
              headers: {
                'Cache-Control': 'no-cache',
              },
            });
            return data;
          })
        );

        setIsPokeSearchErr(false);
        setPokeSearchResponse(fetchedPokeList);
      } catch (err: unknown) {
        return setIsPokeSearchErr(true);
      }
    })(pokeArr, signal);

    return () => {
      controller?.abort();
    };
  }, [pokeArr, pokeSearchInput]);

  return { pokeSearchResponse, isPokeSearchErr };
};
