import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { ContextMain } from '..';
import NavBar from './NavBar';
import headerClasses from '../styles/Header.module.css';
import Button from './Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, MAIN_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import Phones from './Phones/Phones';
import { RiLogoutBoxRLine, RiAdminFill } from 'react-icons/ri';
import Socials from './Socials/Socials';
import Burger from './Burger/Burger';

const Header = observer(() => {

    const { userStore } = useContext(ContextMain);
    const location = useLocation();
    const isMainPage = location.pathname === MAIN_ROUTE;
    const history = useNavigate();
    const [openBurger, setOpenBurger] = useState(false);
    const logoutClickHandler = () => {
        userStore.logout()
        history(MAIN_ROUTE);
    }

    return (
        <header className={[headerClasses.header, !isMainPage && headerClasses.header_home].join(' ')}>
            <div className="container">
                <div className={headerClasses.header_holder}>
                    <Logo />
                    <NavBar mobile={false} />
                    {userStore.isAuth
                        ?
                        <div className={headerClasses.btns}>
                            <Button invert onClick={() => history(ADMIN_ROUTE)}>
                                <RiAdminFill size={20} />
                                <span>Админ панель</span>
                            </Button>
                            <Button onClick={logoutClickHandler}>
                                <RiLogoutBoxRLine size={20} />
                                <span>Выйти</span>
                            </Button>
                        </div>
                        :
                        <>
                            <Socials />
                            <Phones />
                        </>
                    }
                    {isMainPage &&
                        <Burger
                            isOpen={openBurger}
                            onClick={() => setOpenBurger(!openBurger)}
                            closeMenu={() => setOpenBurger(false)}
                        />
                    }
                </div>
            </div>
        </header>
    );
});

export default Header;