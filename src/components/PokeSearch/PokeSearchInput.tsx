import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clear, ErrorOutlineOutlined } from '@mui/icons-material';

import { PokeTypes } from './PokeTypes';
import { usePokeSearch } from '../../hooks/usePokeSearch';
import { usePokeAPIContext } from '../../context/PokeAPIContext';

import pokePageStyles from '../../stylesheets/pages/PokePage.module.scss';
import styles from '../../stylesheets/components/PokeSearch/PokeSearchInput.module.scss';

export const PokeSearchInput = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setHomePageScrollYPosition } = usePokeAPIContext();

  const [pokeSearch, setPokeSearch] = useState('');
  const { pokeSearchResponse, isPokeSearchErr } = usePokeSearch(pokeSearch);

  const atHomePage = pathname === '/';

  const changePokeNameFontSize = pokeSearchResponse?.name.includes('-')
    ? `${styles.pokeName} ${styles.tooBigPokeName}`
    : styles.pokeName;

  const showPokeErrAnimation = isPokeSearchErr
    ? `${styles.pokeSearchErrShow} ${styles.pokeSearchErrContainer}`
    : `${styles.pokeSearchErrHide} ${styles.pokeSearchErrContainer}`;

  const pokeSearchAnimation = pokeSearchResponse
    ? `${styles.pokeSearchInfoWrapper} ${styles.pokeSearchShowAnimation}`
    : `${styles.pokeSearchInfoWrapper} ${styles.pokeSearchHideAnimation}` ||
      styles.pokeSearchInfoWrapper;

  const pokeSearchContainerStyles = `${styles.pokeSearchContainer} ${pokePageStyles.pokeSearchContainer}`;

  return (
    <div className={pokeSearchContainerStyles}>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPokeSearch(e.target.value)}
        className={styles.searchInput}
        value={pokeSearch}
        type='text'
        placeholder='PokeSearch'
      />
      <button onClick={() => setPokeSearch('')} className={styles.clearInputButton}>
        {pokeSearchResponse && <Clear className={styles.clearIcon} />}
      </button>
      <div className={pokeSearchAnimation}>
        <div className={styles.pokeInfoWrapper}>
          <img
            className={styles.pokeImg}
            src={pokeSearchResponse?.sprites.front_default}
            alt={pokeSearchResponse?.name}
          />
          <div className={styles.pokeNameWrapper}>
            <h3 className={changePokeNameFontSize}>{pokeSearchResponse?.name}</h3>
            <PokeTypes types={pokeSearchResponse?.types!} />
          </div>
          <button
            onClick={() => {
              setPokeSearch('');
              atHomePage && setHomePageScrollYPosition(window.scrollY);
              navigate(`/pokemon/${pokeSearchResponse?.name}`, {
                replace: atHomePage ? false : true,
              });
            }}
            className={styles.pokedexButton}
          >
            POKEDEX
          </button>
        </div>
      </div>
      <div className={showPokeErrAnimation}>
        <ErrorOutlineOutlined className={styles.pokeSearchErrIcon} />
        <p className={styles.pokeSearchErrText}>Pokemon doesn't exist!</p>
      </div>
    </div>
  );
};
