import { useState, useEffect } from 'react';

import { axiosAPI } from '../services/axiosAPI';
import { PokeStatsInfo } from '../interfaces/PokeStatsInfo';

type usePokeSearchType = {
  isPokeSearchErr: boolean;
  pokeSearchResponse: PokeStatsInfo | undefined;
};

export const usePokeSearch = (pokeName: string | undefined): usePokeSearchType => {
  const [isPokeSearchErr, setIsPokeSearchErr] = useState<boolean>(false);
  const [pokeSearchResponse, setPokeSearchResponse] = useState<PokeStatsInfo | undefined>();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    (async (pokeName: string | undefined, signal: AbortSignal) => {
      if (!pokeName) {
        return setIsPokeSearchErr(false);
      }

      try {
        const { data: pokeResponse } = await axiosAPI.get<PokeStatsInfo>(
          `pokemon/${pokeName?.toLowerCase()}`,
          {
            signal: signal,
            headers: {
              'Cache-Control': 'no-cache',
            },
          }
        );
        setIsPokeSearchErr(false);
        setPokeSearchResponse(pokeResponse);
      } catch (err: unknown) {
        if (err instanceof Error) {
          err.name === 'AxiosError' && setIsPokeSearchErr(true);
        }
      }
    })(pokeName, signal);

    return () => {
      controller?.abort();
      setPokeSearchResponse(undefined);
    };
  }, [pokeName]);

  return { pokeSearchResponse, isPokeSearchErr };
};
