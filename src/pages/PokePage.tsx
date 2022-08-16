import { useEffect } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

import { usePokeDetails } from '../hooks/usePokeDetails';
import { LoadingComponent } from '../components/LoadingComponent';
import { EvolutionChain } from '../components/PokePage/EvolutionChain';
import { PokeVarieties } from '../components/PokePage/PokeVarieties';
import { PokeSearchInput } from '../components/PokeSearch/PokeSearchInput';
import { PokeInfo } from '../components/PokePage/PokeInfo';

import styles from '../stylesheets/pages/PokePage.module.scss';

export const PokePage: React.FC = () => {
  const navigate = useNavigate();
  const { pokeName } = useParams();

  const {
    getPokeStats,
    getPokeDetails,
    pokeStats,
    pokeDetails,
    pokeVarieties,
    pokeEvolutions,
    isPokeStatsLoading,
    isPokeDetailsLoading,
  } = usePokeDetails();

  const [currentPokeStats] = pokeStats;
  const [currentPokeDetails] = pokeDetails;

  const notMatchingPokeStatsAndParams = isNaN(+pokeName!)
    ? pokeName?.toLowerCase() !== currentPokeStats?.name
    : parseInt(pokeName!) !== currentPokeStats?.id;

  const notMatchingPokeStatsAndDetails =
    currentPokeStats?.species.name !== currentPokeDetails?.name;

  useEffect(() => {
    notMatchingPokeStatsAndParams && getPokeStats(pokeName);
    notMatchingPokeStatsAndDetails && getPokeDetails(currentPokeStats);
  });

  return isPokeStatsLoading || isPokeDetailsLoading ? (
    <LoadingComponent />
  ) : (
    <div className={styles.pokePageContainer}>
      <div className={styles.searchBarWrapper}>
        <button className={styles.homeButton} onClick={() => navigate('/', { replace: true })}>
          <ArrowBack className={styles.arrowIcon} />
          Home
        </button>
        <PokeSearchInput />
      </div>
      <div className={styles.pokeInfoWrapper}>
        <PokeInfo
          choosenPokemonStats={currentPokeStats}
          choosenpokemonDetails={currentPokeDetails}
        />
        <PokeVarieties pokemonVarieties={pokeVarieties} choosenPokemonStats={currentPokeStats} />
      </div>
      <EvolutionChain pokemonChain={pokeEvolutions} />
    </div>
  );
};
