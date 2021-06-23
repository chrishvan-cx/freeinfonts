import useClock from '../../hooks/useClock'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";


import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: false,
    detection:{
      order:['cookie','htmlTag','localStorage','path','subdomain'],
      caches:['cookie']
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend:{
      loadPath:'/assets/locales/{{lng}}/translation.json'
    },
    react:{useSuspense:false}
  });


function Header() {

    const { time } = useClock();
    const {t} = useTranslation()

    return (
        <div className="Header_container">
            <div className="DateTime">{time}</div>
            <div className="Navigation">
               
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/News">News</Link>
                    </li>
                </ul>
              
                <div>{t('hello')}</div>
      <div onClick={()=>i18n.changeLanguage('en')}>en</div>
      <div onClick={()=>i18n.changeLanguage('vn')}>vn</div>
            </div>
            <div className="Right_menu">
                <div>Theme</div>
                <div>Language</div>
                <div>SignIn</div>
            </div>

        </div>
    )
}

export default Header
