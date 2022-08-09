import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

import styles from '../stylesheets/pages/NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundPokeballWrapper}>
        <span className={styles.notFoundNumbers}>4</span>
        <div className={styles.pokeballFirstCircle}>
          <div className={styles.pokeballSecondCircle}>
            <div className={styles.pokeballThirdCircle}></div>
          </div>
        </div>
        <span className={styles.notFoundNumbers}>4</span>
      </div>
      <h2 className={styles.notFoundHeading}>Uh-oh</h2>
      <p className={styles.notFoundText}>You look lost on your journey!</p>
      <button className={styles.notFoundButton} onClick={() => navigate('/', { replace: true })}>
        <ArrowBack /> Go Back Home
      </button>
    </div>
  );
};
