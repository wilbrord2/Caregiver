import Logo from "../logo";
import styles from "./styles";
import NavItems from "../navItems";

const NavBar = () => {
  return (
    <header id="home" className={styles.header}>
      <nav className={`${styles.navContainer}`}>
        <div className={styles.navItems}>
          <Logo />
          <NavItems />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
