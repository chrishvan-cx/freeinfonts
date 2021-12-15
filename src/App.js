import { useState, useEffect } from 'react';
import './style/style.scss';
import 'react-nprogress/nprogress.css'
import './style/nprogress.css'
import 'react-loading-skeleton/dist/skeleton.css';
import { Header } from './components';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import routes from './routes'
import FancyRoutes from './FancyRoutes'
import { NewsContext } from './NewsContext'


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json'
    },
    react: { useSuspense: false }
  });

function App() {
  const [themMode, setThemeMode] = useState();
  const [newsdata, setNewsdata] = useState(null);


  useEffect(() => {
    setThemeMode(localStorage.getItem("themeMode"));
  }, [themMode])
  function handleThemeSelect(theme) {
    setThemeMode(theme);
  }
  return (
    <Router>
      <div className="App" id={themMode}>
        <div className="Header">
          <Header themeFromHeader={(theme) => handleThemeSelect(theme)} />
        </div>

        <Switch>
          <NewsContext.Provider value={{newsdata, setNewsdata}} >
            {routes.map((route, i) =>
              <FancyRoutes key={i} {...route} />
            )}
          </NewsContext.Provider>

        </Switch>

      </div>
    </Router>
  );
}

export default App;
