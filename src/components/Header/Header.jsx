import { memo, useState, useEffect } from 'react';
import useClock from '../../hooks/useClock'
import Account from '../Account/Account';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Language from './Language';
import Cookies from 'js-cookie';



function Header({selectTheme}) {
    const [theme, setTheme] = useState()
    const { time } = useClock();
    const { t } = useTranslation()

    useEffect(() => {
        setTheme(localStorage.getItem("themeMode"));
    }, [selectTheme])
    
    // function handleSetTheme(theme) {
    //     selectTheme(theme);
    // }
    return (
        <div className="Header_container">
            <div className="DateTime">{time}</div>
            <div className="Navigation">

                <ul>
                    <li>
                        <Link to="/">{t("home")}</Link>
                    </li>
                    <li>
                        <Link to="/News">{t("news")}</Link>
                    </li>
                </ul>


            </div>
            <div className="Right_menu">
                <div className="Theme_Slect">{theme === "dark"? 
                <p onClick={()=>selectTheme("light")}>Dark</p>
                :
                <p onClick={()=>selectTheme("dark")}>Light</p>
                }
               
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
