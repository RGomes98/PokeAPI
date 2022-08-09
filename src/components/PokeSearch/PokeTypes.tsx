import { Type } from '../../interfaces/PokeStatsInfo';

import styles from '../../stylesheets/components/PokeSearch/PokeTypes.module.scss';
import pokeInfoStyles from '../../stylesheets/components/PokePageComponents/PokeInfoContainer.module.scss';

export const PokeTypes: React.FC<{ types: Type[] }> = ({ types }) => {
  const pokeTypeContainerStyles = `${styles.pokeTypeContainer} ${pokeInfoStyles.pokeTypeContainer}`;

  return (
    <div className={pokeTypeContainerStyles}>
      {types?.map(({ type: { name: typeName } }, idx) => {
        const pokeTypeTextStyles = `${styles[typeName]} ${styles.pokeTypeText} ${pokeInfoStyles.pokeTypeText}`;

        return (
          <span key={idx} className={pokeTypeTextStyles}>
            {typeName}
          </span>
        );
      })}
    </div>
  );
};
