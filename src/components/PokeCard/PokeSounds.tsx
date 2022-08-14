import { useRef } from 'react';
import { PlayCircle } from '@mui/icons-material';

import pokeSoundsExports from '../../data/pokeSoundsExports';

import styles from '../../stylesheets/components/PokeCardComponents/PokeSounds.module.scss';
import pokeInfoStyles from '../../stylesheets/components/PokePageComponents/PokeInfoContainer.module.scss';

type PokeSoundsProps = {
  pokeId: number;
  pokeName: string;
  isPokeSound: boolean;
  setIsPokeSound: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PokeSounds: React.FC<PokeSoundsProps> = ({
  pokeId,
  pokeName,
  isPokeSound,
  setIsPokeSound,
}) => {
  const pokeSoundRef = useRef<HTMLAudioElement>(null);

  const pokeSoundCooldown = (): void => {
    if (!isPokeSound) {
      setIsPokeSound(true);
      pokeSoundRef?.current?.play();
      setTimeout(() => setIsPokeSound(false), 1000);
    }
  };

  const kantoPokesID = pokeId <= 151;
  const soundPlayerInactiveStyles = `${styles.playButton} ${pokeInfoStyles.playButton}`;
  const soundPlayerContainerStyles = `${styles.soundPlayerContainer} ${pokeInfoStyles.soundPlayerContainer}`;
  const soundPlayerActiveStyles = `${styles.playButton} ${pokeInfoStyles.playButton}  ${styles.activePlayButton}`;

  return (
    <div className={soundPlayerContainerStyles}>
      {kantoPokesID && (
        <>
          <PlayCircle
            onClick={pokeSoundCooldown}
            className={isPokeSound ? soundPlayerActiveStyles : soundPlayerInactiveStyles}
          />
          <audio ref={pokeSoundRef} src={pokeSoundsExports[pokeName]} preload='auto' />
        </>
      )}
    </div>
  );
};
