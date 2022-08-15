import { useNavigate } from 'react-router-dom';

import { Species } from '../../interfaces/PokeEvolutionChain';

import styles from '../../stylesheets/components/PokePageComponents/EvolutionChain.module.scss';

type EvolutionChainProps = {
  pokemonChain: Species[];
};

export const EvolutionChain: React.FC<EvolutionChainProps> = ({ pokemonChain }) => {
  const navigate = useNavigate();

  const pokeSpriteURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  return (
    <div className={styles.evolutionChainContainer}>
      <h2 className={styles.evolutionChainHeading}>Evolutions</h2>
      <div className={styles.evolutionChainWrapper}>
        {pokemonChain?.map(({ name, url }, idx) => {
          return (
            <div
              onClick={() => navigate(`/pokemon/${name}`, { replace: true })}
              className={styles.evolutionChainPoke}
              key={idx}
            >
              <img
                className={styles.evolutionChainImg}
                alt={name}
                src={`${pokeSpriteURL}${url.split('/').at(-2)}.png`}
              />
              <h3 className={styles.evolutionChainName}>{name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};
