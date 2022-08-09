import { PokeCard } from '../PokeCard/PokeCard';
import { usePokeAPIContext } from '../../context/PokeAPIContext';

import styles from '../../stylesheets/components/HomePageComponents/PokeContainer.module.scss';

export const PokeContainer = () => {
  const { pokeData } = usePokeAPIContext();

  return (
    <div className={styles.pokeContainer}>
      {pokeData.map((poke, idx) => {
        return <PokeCard pokeData={poke} key={idx} />;
      })}
    </div>
  );
};
