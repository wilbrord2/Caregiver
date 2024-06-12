import logo from '../../assets/caregiver.svg';
import styles from './styles';

function Logo() {
  return (
    <div className={styles.container}>
      <img src={logo} className={styles.fluidImage} alt="caregiver Logo" />
    </div>
  );
}

export default Logo;
