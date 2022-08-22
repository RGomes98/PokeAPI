import { useRef } from 'react';
import { PlayCircle } from '@mui/icons-material';

import pokeSoundsExports from '../../data/pokeSoundsExports';

import styles from '../../stylesheets/components/PokeCardComponents/PokeSounds.module.scss';
import pokeInfoStyles from '../../stylesheets/components/PokePageComponents/PokeInfoContainer.module.scss';

type PokeSoundsProps = {
  pokeID: number;
  pokeName: string;
  isPokeSound: boolean;
  setIsPokeSound: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PokeSounds: React.FC<PokeSoundsProps> = ({
  pokeID,
  pokeName,
  isPokeSound,
  setIsPokeSound,
}) => {
  const POKE_SOUND_DELAY: number = 1500;
  const kantoPokesID = pokeID <= 151;

  const pokeSoundRef = useRef<HTMLAudioElement>(null);

  const soundPlayerInactiveStyles = `${styles.playButton} ${pokeInfoStyles.playButton}`;
  const soundPlayerContainerStyles = `${styles.soundPlayerContainer} ${pokeInfoStyles.soundPlayerContainer}`;
  const soundPlayerDisabledStyles = `${styles.playButton} ${pokeInfoStyles.playButton} ${styles.disabledPlayButton}`;
  const soundPlayerActiveStyles = `${styles.playButton} ${pokeInfoStyles.playButton}  ${styles.activePlayButton}`;

  const pokeSoundCooldown = (isPokeSoundPlaying: boolean): void => {
    if (!isPokeSoundPlaying) {
      setIsPokeSound(true);
      pokeSoundRef?.current?.play();
      setTimeout(() => setIsPokeSound(false), POKE_SOUND_DELAY);
    }
  };

  return (
    <div className={soundPlayerContainerStyles}>
      {kantoPokesID ? (
        <>
          <PlayCircle
            onClick={() => pokeSoundCooldown(isPokeSound)}
            className={isPokeSound ? soundPlayerActiveStyles : soundPlayerInactiveStyles}
          />
          <audio ref={pokeSoundRef} src={pokeSoundsExports[pokeName]} preload='auto' />
        </>
      ) : (
        <PlayCircle className={soundPlayerDisabledStyles} />
      )}
    </div>
  );
};
