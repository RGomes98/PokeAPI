import { useState } from 'react';
import { Info } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { CardStats } from './CardStats';
import { PokeSounds } from './PokeSounds';
import { PokeStatsInfo } from '../../interfaces/PokeStatsInfo';
import { usePokeAPIContext } from '../../context/PokeAPIContext';

import styles from '../../stylesheets/components/PokeCardComponents/PokeCard.module.scss';

export const PokeCard: React.FC<{ pokeData: PokeStatsInfo }> = ({
  pokeData: { name, id, sprites, height, weight, stats },
}) => {
  const navigate = useNavigate();
  const { setHomePageScrollYPosition } = usePokeAPIContext();
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  return (
    <div className={styles.pokeCard}>
      <div className={styles.cardContainer}>
        <PokeSounds
          pokeId={id}
          pokeName={name}
          isPokeSound={isAudioPlaying}
          setIsPokeSound={setIsAudioPlaying}
        />
        <Info
          onClick={() => {
            navigate(`/pokemon/${name}`);
            setHomePageScrollYPosition(window.scrollY);
          }}
          className={styles.infoButton}
        />
        <img src={sprites?.front_default} alt={name} className={styles.pokeImg} />
        <h3 className={styles.pokeName}>{name}</h3>
      </div>
      <CardStats height={height} weight={weight} stats={stats} />
    </div>
  );
};
