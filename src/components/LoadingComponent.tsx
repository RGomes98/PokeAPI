import loadingSpinner from '../assets/svg/loadingSpinner.svg';
import styles from '../stylesheets/components/LoadingComponent.module.scss';

export const LoadingComponent: React.FC = () => {
  return (
    <div className={styles.loadingComponentContainer}>
      <img className={styles.loadingComponentImg} src={loadingSpinner} alt='loadingSpinner' />
      <h1 className={styles.loadingComponentHeading}>Loading</h1>
    </div>
  );
};
