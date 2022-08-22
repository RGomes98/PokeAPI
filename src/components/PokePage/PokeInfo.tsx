import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

import { CardStats } from '../PokeCard/CardStats';
import { PokeSounds } from '../PokeCard/PokeSounds';
import { PokeTypes } from '../PokeSearch/PokeTypes';
import { PokeStatsInfo } from '../../interfaces/PokeStatsInfo';
import { PokeSpeciesInfo } from '../../interfaces/PokeSpeciesInfo';

import styles from '../../stylesheets/components/PokePageComponents/PokeInfoContainer.module.scss';

type PokeInfoProps = {
  choosenPokemonStats: PokeStatsInfo;
  choosenpokemonDetails: PokeSpeciesInfo;
};

export const PokeInfo: React.FC<PokeInfoProps> = ({
  choosenPokemonStats,
  choosenpokemonDetails,
}) => {
  const navigate = useNavigate();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const flavorTextSelector = (generation: string): number => {
    switch (generation) {
      case 'generation-i':
        return 11;

      case 'generation-ii':
        return 8;

      case 'generation-iii':
        return 3;

      case 'generation-iv':
        return 4;

      case 'generation-v':
        return 5;

      case 'generation-vi':
        return 6;

      case 'generation-vii':
        return 7;

      case 'generation-viii':
        return 17;

      default:
        return 0;
    }
  };

  const FIRST_POKE_ID: number = 1;
  const LAST_POKE_ID: number = 898;
  const pokeGeneration = choosenpokemonDetails?.generation.name;

  const canGoToNextPoke = LAST_POKE_ID > choosenPokemonStats?.id;

  const canGoToPreviousPoke =
    FIRST_POKE_ID < choosenPokemonStats?.id && LAST_POKE_ID >= choosenPokemonStats?.id;

  const selectedPokeFlavorText =
    choosenpokemonDetails?.flavor_text_entries[flavorTextSelector(pokeGeneration)].flavor_text;

  const pokeNameStyles =
    choosenPokemonStats?.name.includes('-') && choosenPokemonStats?.name.length > 10
      ? `${styles.pokeInfoName} ${styles.tooBigpokeInfoName}`
      : styles.pokeInfoName;

  const pokeFlavorTextStyles =
    choosenpokemonDetails?.flavor_text_entries[flavorTextSelector(pokeGeneration)].flavor_text
      .length < 150
      ? styles.pokeInfoFlavorText
      : `${styles.pokeInfoFlavorText} ${styles.pokeInfoFlavorTextTooBig}`;

  return (
    <div className={styles.pokeInfoContainer}>
      <div className={styles.pokeInfoWrapper}>
        <div className={styles.pokeInfoHeading}>
          <PokeSounds
            pokeID={choosenPokemonStats?.id}
            pokeName={choosenPokemonStats?.name}
            isPokeSound={isAudioPlaying}
            setIsPokeSound={setIsAudioPlaying}
          />
          <h1
            className={pokeNameStyles}
          >{`#.${choosenpokemonDetails?.id} ${choosenPokemonStats?.name}`}</h1>
        </div>
        <img
          src={choosenPokemonStats?.sprites.front_default}
          alt={choosenPokemonStats?.name}
          className={styles.pokeInfoImg}
        />
        <p className={pokeFlavorTextStyles}>{selectedPokeFlavorText}</p>
        {canGoToPreviousPoke && (
          <NavigateBefore
            onClick={() => navigate(`/pokemon/${choosenPokemonStats?.id - 1}`, { replace: true })}
            className={`${styles.searchBar_navigationButton} ${styles.navigationButtonLeft}`}
          />
        )}
        {canGoToNextPoke && (
          <NavigateNext
            onClick={() => navigate(`/pokemon/${choosenPokemonStats?.id + 1}`, { replace: true })}
            className={`${styles.searchBar_navigationButton} ${styles.navigationButtonRight}`}
          />
        )}
      </div>
      <div className={styles.pokeInfoTypeStatsWrapper}>
        <CardStats
          stats={choosenPokemonStats?.stats}
          height={choosenPokemonStats?.height}
          weight={choosenPokemonStats?.weight}
        />
        <PokeTypes types={choosenPokemonStats?.types} />
      </div>
    </div>
  );
};
