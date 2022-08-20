import { Type } from '../../interfaces/PokeStatsInfo';

import styles from '../../stylesheets/components/PokeSearch/PokeTypes.module.scss';
import pokeInfoStyles from '../../stylesheets/components/PokePageComponents/PokeInfoContainer.module.scss';

export const PokeTypes: React.FC<{ types: Type[] }> = ({ types }) => {
  return (
    <div className={`${styles.pokeTypeContainer} ${pokeInfoStyles.pokeTypeContainer}`}>
      {types?.map(({ type: { name: typeName } }, idx) => {
        const pokeTypeTextStyles =
          types.length > 1
            ? `${styles[typeName]} ${styles.pokeTypeText} ${pokeInfoStyles.pokeTypeText}`
            : `${styles[typeName]} ${styles.pokeTypeText} ${pokeInfoStyles.pokeTypeText} ${pokeInfoStyles.pokeTypeOne} `;

        return (
          <span key={idx} className={pokeTypeTextStyles}>
            {typeName}
          </span>
        );
      })}
    </div>
  );
};
