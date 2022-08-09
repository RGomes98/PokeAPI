import { useState } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import { Variety } from '../../interfaces/PokeSpeciesInfo';
import { PokeStatsInfo } from '../../interfaces/PokeStatsInfo';

import styles from '../../stylesheets/components/PokePageComponents/PokeVarieties.module.scss';

type PokeVarietiesProps = {
  pokemonVarieties: Variety[];
  choosenPokemonStats: PokeStatsInfo | undefined;
};

export const PokeVarieties: React.FC<PokeVarietiesProps> = ({
  choosenPokemonStats,
  pokemonVarieties,
}) => {
  const [variationSlider, setVariationSlider] = useState(0);

  const isChoosenPokeMega = choosenPokemonStats?.name.includes('-mega') ? 1 : 0;
  const varietiesLength = pokemonVarieties.slice(isChoosenPokeMega).length - 1;

  const pokeSpritesURL =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  const handleVariations = (action: string): void => {
    if (action === 'NEXT')
      setVariationSlider((prev) => (variationSlider < varietiesLength ? prev + 1 : 0));
    if (action === 'PREVIOUS')
      setVariationSlider((prev) => (variationSlider > 0 ? prev - 1 : varietiesLength));
  };

  return (
    <div className={styles.pokeVarietiesContainer}>
      <h2 className={styles.pokeVarietiesHeading}>Variations</h2>
      <div className={styles.pokemonVarietiesWrapper}>
        {!!varietiesLength && (
          <ChevronLeft
            className={`${styles.variationButton} ${styles.variationButtonLeft}`}
            onClick={() => handleVariations('PREVIOUS')}
          />
        )}
        {!!varietiesLength && (
          <ChevronRight
            className={`${styles.variationButton} ${styles.variationButtonRight}`}
            onClick={() => handleVariations('NEXT')}
          />
        )}
        {pokemonVarieties.slice(isChoosenPokeMega).map(({ pokemon: { name, url } }, idx) => {
          const DEFAULT_POKE_SPRITE_TO_SHINY =
            name === pokemonVarieties[isChoosenPokeMega].pokemon.name
              ? `${pokeSpritesURL}shiny/${url.split('/').at(-2)}.png`
              : `${pokeSpritesURL}${url.split('/').at(-2)}.png`;

          const DEFAULT_POKE_NAME_TO_SHINY =
            name === pokemonVarieties[isChoosenPokeMega].pokemon.name ? `${name}-shiny` : name;

          return (
            <div
              className={
                variationSlider !== idx
                  ? `${styles.hidePokeVariation} ${styles.variationWrapper}`
                  : `${styles.showPokeVariation} ${styles.variationWrapper}`
              }
              key={idx}
            >
              <h3 className={styles.pokeVariationName_heading}>{DEFAULT_POKE_NAME_TO_SHINY}</h3>
              <img
                className={styles.pokeVariation_img}
                src={`${DEFAULT_POKE_SPRITE_TO_SHINY}`}
                alt={DEFAULT_POKE_NAME_TO_SHINY}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
