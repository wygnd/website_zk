import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { ContextMain } from "..";
import NavBar from "./NavBar";
import headerClasses from "../styles/Header.module.scss";
import { useLocation } from "react-router-dom";
import { MAIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import Phones from "./Phones/Phones";
import Socials from "./Socials/Socials";
import Burger from "./Burger/Burger";
import AdminPreview from "./AdminComponents/AdminPreview/AdminPreview";

const Header = observer(() => {
  const { userStore } = useContext(ContextMain);
  const location = useLocation();
  const isMainPage = location.pathname === MAIN_ROUTE;
  const [openBurger, setOpenBurger] = useState(false);

  return (
    <header
      className={[
        headerClasses.header,
        !isMainPage && headerClasses.header_home,
      ].join(" ")}
    >
      <div className="container">
        <div className={headerClasses.header_holder}>
          <Logo />
          {isMainPage && <NavBar mobile={false} />}
          {userStore.isAuth ? (
            <div className={headerClasses.admin_preview}>
              <AdminPreview />
            </div>
          ) : (
            <>
              <Socials />
              <Phones />
            </>
          )}
          {isMainPage && (
            <Burger
              isOpen={openBurger}
              onClick={() => setOpenBurger(!openBurger)}
              closeMenu={() => setOpenBurger(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
