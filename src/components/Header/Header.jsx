import { memo, useState} from 'react';
import useClock from '../../hooks/useClock'
import Account from '../Account/Account';
import {  NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Language from './Language';



function Header({ themeFromHeader }) {
    const [theme, setTheme] = useState();
    const [sideBar, setSideBar] = useState();

    const { time } = useClock();
    const { t } = useTranslation()

    function handleSetTheme(theme) {
        localStorage.setItem("themeMode", theme)
        setTheme(theme);
        themeFromHeader(theme);
    }

    function handleOpenSideBar() {
        setSideBar(!sideBar)
    }

    return (
        <div className="Header_container">
            <div className={`mobile-burger show-onMobile ${sideBar ? "close-bger" : ""}`} onClick={handleOpenSideBar}>
                <span></span>
                <span></span>
                <span></span>
                </div>
            <div className="DateTime show-onDesktop">
                <i className="ai-calendar" style={{ marginRight: "5px" }}></i>
                {time}
            </div>
            <div className={`Navigation ${sideBar ? "show" : "hide"}`} >

                <ul>
                    <li className='show-onMobile'>
                        <div className="DateTime">
                            <i className="ai-calendar" style={{ marginRight: "5px" }}></i>
                            {time}
                        </div>
                    </li>
                    <li>
                        <NavLink exact to="/" activeClassName='active'><i className="ai-house"></i>{t("fonts")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/News" activeClassName='active'><i className="ai-world-o"></i>{t("news")}</NavLink>
                    </li>
                </ul>

                {/* <div className='modal-cover' onClick={() => setSideBar(false)}></div> */}
            </div>
            <div className="Right_menu">
                <div className="Theme_Slect">
                    <div className="switch-btns">
                        <div className={`switch-case ${theme === "dark" ? "dark" : "light"}`}>
                            <div onClick={() => handleSetTheme("dark")}>ON</div>
                            <div onClick={() => handleSetTheme("light")}>OFF</div>
                        </div>

                    </div>

                </div>
                <div className="Language_Wrapper"><Language /></div>
                <div className="Account_Wrapper">
                    <Account />
                </div>
            </div>

        </div>
    )
}

export default memo(Header)
