import { useEffect } from 'react';

import { PokeCard } from '../PokeCard/PokeCard';
import { usePokeAPIContext } from '../../context/PokeAPIContext';

import styles from '../../stylesheets/components/HomePageComponents/PokeContainer.module.scss';

export const PokeContainer = () => {
  const { pokeData, pokeDataDelaySlice, setPokeDataDelaySlice } = usePokeAPIContext();

  useEffect(() => {
    if (pokeDataDelaySlice < pokeData.length) {
      const renderDelay = setTimeout(() => {
        setPokeDataDelaySlice((prev) => prev + 1);
      }, 300);

      return () => clearTimeout(renderDelay);
    }
  });

  return (
    <div className={styles.pokeContainer}>
      {pokeData.slice(0, pokeDataDelaySlice).map((poke) => {
        return <PokeCard pokeData={poke} key={poke?.name} />;
      })}
    </div>
  );
};
