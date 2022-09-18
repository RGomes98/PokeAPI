import { useLocation } from 'react-router-dom';
import { Stat } from '../../interfaces/PokeStatsInfo';

import styles from '../../stylesheets/components/PokeCardComponents/CardStats.module.scss';
import pokeInfoStyles from '../../stylesheets/components/PokePageComponents/PokeInfoContainer.module.scss';

type CardStatsProps = {
  stats: Stat[];
  height: number;
  weight: number;
};

export const CardStats: React.FC<CardStatsProps> = ({ height, weight, stats }) => {
  const { pathname } = useLocation();

  const UNIT_FORMULA: number = 10;
  const atHomePage: boolean = pathname === '/';

  const cardStatStyles = `${styles.statsWrapper} ${pokeInfoStyles.statsWrapper}`;
  const cardUnitNameStyles = `${styles.statsUnitName} ${pokeInfoStyles.statsUnitName}`;
  const statsContainerStyles = `${styles.statsContainer} ${pokeInfoStyles.statsContainer}`;
  const cardUnitNumberStyles = `${styles.statsUnitNumber} ${pokeInfoStyles.statsUnitNumber}`;
  const cardUnitDisplayStyles = `${styles.statsUnitDisplay} ${pokeInfoStyles.statsUnitDisplay}`;

  return (
    <div className={statsContainerStyles}>
      {stats?.map(({ base_stat, stat: { name } }, idx) => {
        const changeStatsNames = (name: string): string => {
          switch (name) {
            case 'hp':
              return atHomePage ? 'HP' : 'HEALTH';
            case 'speed':
              return atHomePage ? 'SPD' : 'SPEED';
            case 'attack':
              return atHomePage ? 'ATT' : 'ATTACK';
            case 'defense':
              return atHomePage ? 'DEF' : 'DEFENSE';
            case 'special-attack':
              return atHomePage ? 'ATT-S' : 'SPECIAL-ATTACK';
            case 'special-defense':
              return atHomePage ? 'DEF-S' : 'SPECIAL-DEFENSE';
            default:
              return name;
          }
        };

        return (
          <div className={cardStatStyles} key={idx}>
            <span className={cardUnitNumberStyles}>{base_stat}</span>
            <p className={cardUnitNameStyles}>{changeStatsNames(name)}</p>
          </div>
        );
      })}
      <div className={cardStatStyles}>
        <span className={cardUnitNumberStyles}>
          {height / UNIT_FORMULA}
          <span className={cardUnitDisplayStyles}>m</span>
        </span>
        <p className={cardUnitNameStyles}>{atHomePage ? 'HGT' : 'HEIGHT'}</p>
      </div>
      <div className={cardStatStyles}>
        <span className={cardUnitNumberStyles}>
          {(weight / UNIT_FORMULA).toFixed(1)}
          <span className={cardUnitDisplayStyles}>kg</span>
        </span>
        <p className={cardUnitNameStyles}>{atHomePage ? 'WGT' : 'WEIGHT'}</p>
      </div>
    </div>
  );
};
