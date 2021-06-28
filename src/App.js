
import './style/style.scss';
import { Header, Home, News } from './components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useState } from 'react';


i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
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

function App() {
  const [themMode,setThemeMode] = useState();



  function handleThemeSelect(theme){
    console.log("Apptheme",theme);
    setThemeMode(theme);
    localStorage.setItem('themeMode',theme);
  }
  return (
    <Router>
      <div className={themMode ? "App " + themMode  : "App" }>
        <div className="Header">
          <Header selectTheme = {(theme)=>handleThemeSelect(theme)}/>
        </div>

        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/News" component={News}/>
        </Switch>



      </div>
    </Router>
  );
}

export default App;
