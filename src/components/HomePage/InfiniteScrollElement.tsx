import { usePokeAPIContext } from '../../context/PokeAPIContext';

import loadingSpinner from '../../assets/svg/loadingSpinner.svg';
import styles from '../../stylesheets/components/HomePageComponents/InfiniteScrollElement.module.scss';

type InfiniteScrollElementProps = {
  infiniteRef: React.RefObject<HTMLImageElement>;
  isPokesLoading: boolean;
};

export const InfiniteScrollElement: React.FC<InfiniteScrollElementProps> = ({
  infiniteRef,
  isPokesLoading,
}) => {
  const { isInfiniteScrollActive } = usePokeAPIContext();

  return (
    <>
      {isInfiniteScrollActive && (
        <img
          src={loadingSpinner}
          alt={'loadingSpinner'}
          className={
            isPokesLoading
              ? styles.infiniteScrollSpinner
              : ` ${styles.infiniteScrollSpinner} ${styles.hiddenInfiniteScroll}`
          }
          ref={isPokesLoading ? null : infiniteRef}
        />
      )}
    </>
  );
};
