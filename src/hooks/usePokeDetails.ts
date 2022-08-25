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
  isPokeDetailsLoading: boolean;
  pokeDetails: PokeSpeciesInfo[];
  getPokeStats: (pokeName: string | undefined) => Promise<void>;
};

export const usePokeDetails = (): usePokeDetailsReturn => {
  const navigate = useNavigate();

  const [pokeStats, setPokeStats] = useState<PokeStatsInfo[]>([]);
  const [pokeVarieties, setPokeVarieties] = useState<Variety[]>([]);
  const [pokeEvolutions, setPokeEvolutions] = useState<Species[]>([]);
  const [pokeDetails, setPokeDetails] = useState<PokeSpeciesInfo[]>([]);
  const [isPokeDetailsLoading, setIsPokeDetailsLoading] = useState(false);

  const getPokeStats = async (pokeName: string | undefined): Promise<void> => {
    setIsPokeDetailsLoading(true);

    try {
      const { data } = await axiosAPI.get<PokeStatsInfo>(`pokemon/${pokeName?.toLowerCase()}`);
      setPokeStats([data]);
      getPokeDetails(data);
    } catch (err) {
      navigate('/pokemon', { replace: true });
      setIsPokeDetailsLoading(false);
    }
  };

  const getPokeDetails = async (pokeStats: PokeStatsInfo): Promise<void> => {
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
          !poke.pokemon.name.includes('-cap') &&
          !poke.pokemon.name.includes('-totem') &&
          !poke.pokemon.name.includes('-hisui') &&
          !poke.pokemon.name.includes('-starter');

        if (isNotFiltered) return poke;
        return false;
      });

      setPokeDetails([selectedPokeDetails]);
      setPokeVarieties(cleanedPokeVarieties);
      setPokeEvolutions(selectedPokeEvolutionChain);
      setIsPokeDetailsLoading(false);
    } catch (err) {
      console.error(err);
      setIsPokeDetailsLoading(false);
    }
  };

  return {
    getPokeStats,
    isPokeDetailsLoading,
    pokeDetails,
    pokeVarieties,
    pokeEvolutions,
    pokeStats,
  };
};
