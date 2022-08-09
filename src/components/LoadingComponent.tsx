import loadingSpinner from '../assets/svg/loadingSpinner.svg';
import styles from '../stylesheets/components/LoadingComponent.module.scss';

export const LoadingComponent: React.FC = () => {
  return (
    <div className={styles.loadingComponentContainer}>
      <h1 className={styles.loadingComponentHeading}>Loading</h1>
      <img className={styles.loadingComponentImg} src={loadingSpinner} alt='loadingSpinner' />
    </div>
  );
};
