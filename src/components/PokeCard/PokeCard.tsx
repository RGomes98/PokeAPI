import { useState } from 'react';
import { Info } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { CardStats } from './CardStats';
import { PokeSounds } from './PokeSounds';
import { PokeStatsInfo } from '../../interfaces/PokeStatsInfo';

import styles from '../../stylesheets/components/PokeCardComponents/PokeCard.module.scss';

export const PokeCard: React.FC<{ pokeData: PokeStatsInfo }> = ({
  pokeData: { name, id, sprites, height, weight, stats },
}) => {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div className={styles.pokeCard}>
      <div className={styles.cardContainer}>
        <PokeSounds
          pokeId={id}
          pokeName={name}
          isPokeSound={isAnimationPlaying}
          setIsPokeSound={setIsAnimationPlaying}
        />
        <Info onClick={() => navigate(`/pokemon/${name}`)} className={styles.infoButton} />
        <img
          src={sprites?.front_default}
          alt={name}
          className={
            isAnimationPlaying
              ? `${styles.pokeImg} ${styles.pokeImgAnimation}`
              : `${styles.pokeImg}`
          }
        />
        <h3 className={styles.pokeName}>{name}</h3>
      </div>
      <CardStats height={height} weight={weight} stats={stats} />
    </div>
  );
};
