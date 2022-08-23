import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clear, ErrorOutlineOutlined } from '@mui/icons-material';

import { PokeTypes } from './PokeTypes';
import { PokeURL } from '../../interfaces/PokeURLInfo';
import { usePokeSearch } from '../../hooks/usePokeSearch';
import { usePokeAPIContext } from '../../context/PokeAPIContext';

import ringLoadingSpinner from '../../assets/svg/ringLoadingSpinner.svg';
import pokePageStyles from '../../stylesheets/pages/PokePage.module.scss';
import styles from '../../stylesheets/components/PokeSearch/PokeSearchInput.module.scss';

export const PokeSearchInput = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { pokeSearchList, setHomePageScrollYPosition } = usePokeAPIContext();

  const [isOnFocus, setIsOnFocus] = useState(false);
  const [pokeSearchInput, setPokeSearchInput] = useState('');
  const [filteredPokeList, setFilteredPokeList] = useState<PokeURL[]>([]);

  const { pokeSearchResponse, isPokeSearchLoading, isPokeSearchErr } = usePokeSearch(
    filteredPokeList,
    pokeSearchInput
  );

  const pokeSearchTransition = (pokeResponseArraySize: number): string => {
    switch (pokeResponseArraySize) {
      case 1:
        return styles.searchSmall;
      case 2:
        return styles.searchMedium;
      case 3:
        return styles.searchLarge;
      default:
        return styles.pokeSearchInfoWrapper;
    }
  };

  const pokeSearchFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setPokeSearchInput(value);

    const filter = pokeSearchList
      .filter((poke) => {
        if (!value) return false;
        if (poke.name.toLowerCase().includes(value.toLowerCase())) return poke;
        return false;
      })
      .slice(0, 3);

    setFilteredPokeList(filter);
  };

  const atHomePage = pathname === '/';

  const searchInputFocus =
    isOnFocus && !pokeSearchResponse.length
      ? `${styles.searchInput} ${styles.focusSearchInput}`
      : styles.searchInput;

  const showPokeErrAnimation =
    isPokeSearchErr && pokeSearchInput
      ? `${styles.pokeSearchErrShow} ${styles.pokeSearchErrContainer}`
      : styles.pokeSearchErrContainer;

  const pokeSearchWrapperStyles = `${styles.pokeSearchWrapper} ${pokeSearchTransition(
    pokeSearchResponse?.length
  )}`;

  return (
    <div className={`${styles.pokeSearchContainer} ${pokePageStyles.pokeSearchContainer}`}>
      <input
        value={pokeSearchInput}
        onChange={pokeSearchFilter}
        onFocus={() => setIsOnFocus(true)}
        onBlur={() => setIsOnFocus(false)}
        type='text'
        placeholder='PokeSearch'
        className={searchInputFocus}
      />
      <button
        onClick={() => {
          setPokeSearchInput('');
          setFilteredPokeList([]);
        }}
        className={styles.clearInputButton}
      >
        {!!pokeSearchResponse?.length && !isPokeSearchLoading && (
          <Clear className={styles.clearIcon} />
        )}
      </button>
      {isPokeSearchLoading && (
        <img
          src={ringLoadingSpinner}
          alt='ringLoadingSpinner'
          className={styles.ringLoadingSpinner}
        />
      )}
      <div className={pokeSearchWrapperStyles}>
        {pokeSearchResponse.map((poke, idx) => {
          const hideFirstPokeBorder =
            idx === 0
              ? `${styles.pokeInfoWrapper} ${styles.hideFirstBorder}`
              : styles.pokeInfoWrapper;

          const changePokeNameFontSize =
            poke?.name.length > 12 && poke?.name.includes('-')
              ? `${styles.pokeName} ${styles.tooBigPokeName}`
              : styles.pokeName;

          return (
            <div className={hideFirstPokeBorder} key={idx}>
              <img className={styles.pokeImg} src={poke?.sprites.front_default} alt={poke?.name} />
              <div className={styles.pokeNameWrapper}>
                <h3 className={changePokeNameFontSize}>{poke?.name}</h3>
                <PokeTypes types={poke?.types!} />
              </div>
              <button
                onClick={() => {
                  atHomePage && setHomePageScrollYPosition(window.scrollY);
                  navigate(`/pokemon/${poke?.name}`, {
                    replace: atHomePage ? false : true,
                  });
                }}
                className={styles.pokedexButton}
              >
                POKEDEX
              </button>
            </div>
          );
        })}
      </div>
      <div className={showPokeErrAnimation}>
        <ErrorOutlineOutlined className={styles.pokeSearchErrIcon} />
        <p className={styles.pokeSearchErrText}>Pokemon doesn't exist!</p>
      </div>
    </div>
  );
};
