import { useEffect } from 'react';

import { usePokeFetch } from '../hooks/usePokeFetch';
import { usePokeAPIContext } from '../context/PokeAPIContext';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

import { PokeContainer } from '../components/HomePage/PokeContainer';
import { PokeSearchInput } from '../components/PokeSearch/PokeSearchInput';
import { InfiniteScrollElement } from '../components/HomePage/InfiniteScrollElement';

import pokeLogo from '../assets/svg/pokemonLogo.svg';
import styles from '../stylesheets/pages/HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { pokeData } = usePokeAPIContext();

  const { getPokes, isPokeAPILoading } = usePokeFetch();

  const { infiniteScrollRef, isVisible, setIsVisible } = useInfiniteScroll({
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  useEffect(() => {
    !pokeData && getPokes();
    if (isVisible) {
      setIsVisible(false);
      getPokes();
    }
  });

  return (
    <div className={styles.homePage}>
      <img className={styles.homePage__logo} src={pokeLogo} alt={pokeLogo} />
      <PokeSearchInput />
      <PokeContainer />
      <InfiniteScrollElement infiniteRef={infiniteScrollRef} isPokesLoading={isPokeAPILoading} />
    </div>
  );
};
