import styles from "./styles";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar";
// import ProfileView from "../../components/ProfileView";

const Root = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <Outlet />
      {/* <ProfileView /> */}
    </div>
  );
};

export default Root;
