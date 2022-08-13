import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { axiosAPI } from '../services/axiosAPI';
import { PokeStatsInfo } from '../interfaces/PokeStatsInfo';
import { PokeSpeciesInfo, Variety } from '../interfaces/PokeSpeciesInfo';
import { PokeEvolutionChain, Chain, Species } from '../interfaces/PokeEvolutionChain';

type usePokeDetailsReturn = {
  pokeVarieties: Variety[];
  pokeEvolutions: Species[];
  pokeStats: PokeStatsInfo[];
  isPokeStatsLoading: boolean;
  isPokeDetailsLoading: boolean;
  pokeDetails: PokeSpeciesInfo[];
  getPokeStats: (pokeName: string | undefined) => Promise<void>;
  getPokeDetails: (pokeStats: PokeStatsInfo | undefined) => Promise<void>;
};

export const usePokeDetails = (): usePokeDetailsReturn => {
  const navigate = useNavigate();

  const [isPokeStatsLoading, setIsPokeStatsLoading] = useState(false);
  const [isPokeDetailsLoading, setIsPokeDetailsLoading] = useState(false);

  const [pokeStats, setPokeStats] = useState<PokeStatsInfo[]>([]);
  const [pokeVarieties, setPokeVarieties] = useState<Variety[]>([]);
  const [pokeEvolutions, setPokeEvolutions] = useState<Species[]>([]);
  const [pokeDetails, setPokeDetails] = useState<PokeSpeciesInfo[]>([]);

  const getPokeStats = async (pokeName: string | undefined) => {
    setIsPokeStatsLoading(true);

    try {
      const { data } = await axiosAPI.get<PokeStatsInfo>(
        `pokemon/${pokeName?.toLocaleLowerCase()}`
      );
      setPokeStats([data]);
      setIsPokeStatsLoading(false);
    } catch (err) {
      navigate('/pokemon', { replace: true });
      setIsPokeStatsLoading(false);
    }
  };

  const getPokeDetails = async (pokeStats: PokeStatsInfo | undefined) => {
    if (!pokeStats) return;
    setIsPokeDetailsLoading(true);

    try {
      const {
        species: { url: pokePokeDetailsURL },
      } = pokeStats;
      const { data: selectedPokeDetails } = await axiosAPI.get<PokeSpeciesInfo>(
        `${pokePokeDetailsURL}`
      );

      const {
        evolution_chain: { url: evolutionChainURL },
      } = selectedPokeDetails;
      const {
        data: { chain: selectedPokeChain },
      } = await axiosAPI.get<PokeEvolutionChain>(`${evolutionChainURL}`);

      const selectedPokeEvolutionChain: Species[] = [];

      const getEvolutionChain = (obj: Chain): void => {
        for (let val in obj) {
          if (val === 'evolves_to') {
            if (obj[val]?.length) {
              obj[val]?.forEach((pokeChain) => {
                return getEvolutionChain(pokeChain);
              });
            }
          }
          if (val === 'species') {
            selectedPokeEvolutionChain.push(obj[val]);
          }
        }
      };
      getEvolutionChain(selectedPokeChain);

      const { varieties: selectedPokeVarieties } = selectedPokeDetails;

      const cleanedPokeVarieties = selectedPokeVarieties.filter((poke) => {
        const isNotFiltered =
          !poke.pokemon.name.includes('-totem') &&
          !poke.pokemon.name.includes('-hisui') &&
          !poke.pokemon.name.includes('-starter') &&
          !poke.pokemon.name.includes('-world-cap');

        if (isNotFiltered) return poke;
        return false;
      });

      setPokeDetails([selectedPokeDetails]);
      setPokeVarieties(cleanedPokeVarieties);
      setPokeEvolutions(selectedPokeEvolutionChain);
      setIsPokeDetailsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    getPokeStats,
    getPokeDetails,
    isPokeDetailsLoading,
    isPokeStatsLoading,
    pokeDetails,
    pokeVarieties,
    pokeEvolutions,
    pokeStats,
  };
};
