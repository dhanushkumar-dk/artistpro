import HeaderBanner from "./Others/Banners/HeaderBanner";
import Footer from "./Others/Footers/Footer";
import Navbar from "./Others/components/Navbar";

import { Outlet, useLocation } from "react-router-dom";
import ProfileNavbar from "./Profile/Components/ProfileNavbar";

const Layout = ({ userName, setUserName, isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();

  // Define routes where profile navbar should appear
  const profileRoutes = ["/profile", "/profile/my-instruments"];
  const isProfileRoute = profileRoutes.includes(location.pathname);

  return (
    <>
      <HeaderBanner
        userName={userName}
        setUserName={setUserName}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Conditionally render navbars */}
      {isProfileRoute ? <ProfileNavbar /> : <Navbar />}

      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
