import { Stat } from '../../interfaces/PokeStatsInfo';

import styles from '../../stylesheets/components/PokeCardComponents/CardStats.module.scss';
import pokeInfoStyles from '../../stylesheets/components/PokePageComponents/PokeInfoContainer.module.scss';

type CardStatsProps = {
  stats: Stat[];
  height: number;
  weight: number;
};

export const CardStats: React.FC<CardStatsProps> = ({ height, weight, stats }) => {
  const unitFormula = 10;
  const cardStatStyles = `${styles.statsWrapper} ${pokeInfoStyles.statsWrapper}`;
  const cardUnitNameStyles = `${styles.statsUnitName} ${pokeInfoStyles.statsUnitName}`;
  const statsContainerStyles = `${styles.statsContainer} ${pokeInfoStyles.statsContainer}`;
  const cardUnitNumberStyles = `${styles.statsUnitNumber} ${pokeInfoStyles.statsUnitNumber}`;
  const cardUnitDisplayStyles = `${styles.statsUnitDisplay} ${pokeInfoStyles.statsUnitDisplay}`;

  return (
    <div className={statsContainerStyles}>
      {stats?.map(({ base_stat, stat: { name } }, idx) => {
        const changeStatsNames =
          (name === 'hp' && 'HP') ||
          (name === 'speed' && 'SPD') ||
          (name === 'attack' && 'ATT') ||
          (name === 'defense' && 'DEF') ||
          (name === 'special-attack' && 'ATT-S') ||
          (name === 'special-defense' && 'DEF-S');

        return (
          <div className={cardStatStyles} key={idx}>
            <span className={cardUnitNumberStyles}>{base_stat}</span>
            <p className={cardUnitNameStyles}>{changeStatsNames}</p>
          </div>
        );
      })}
      <div className={cardStatStyles}>
        <span className={cardUnitNumberStyles}>
          {height / unitFormula}
          <span className={cardUnitDisplayStyles}>m</span>
        </span>
        <p className={cardUnitNameStyles}>HEIGHT</p>
      </div>
      <div className={cardStatStyles}>
        <span className={cardUnitNumberStyles}>
          {(weight / unitFormula).toFixed(1)}
          <span className={cardUnitDisplayStyles}>kg</span>
        </span>
        <p className={cardUnitNameStyles}>WEIGHT</p>
      </div>
    </div>
  );
};
