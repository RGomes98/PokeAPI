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
  const pokeSoundCooldown = (): void => {
    if (!isPokeSound) {
      setIsPokeSound(true);
      new Audio(pokeSoundsExports[pokeName]).play();
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
        <PlayCircle
          onClick={pokeSoundCooldown}
          className={isPokeSound ? soundPlayerActiveStyles : soundPlayerInactiveStyles}
        />
      )}
    </div>
  );
};
