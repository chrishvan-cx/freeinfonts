import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import cookies from 'js-cookie';

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



function Language() {
  
    
    const listLang = [
      {
        code: 'en',
        name:'English'
      },
      {
        code: 'vn',
        name:'VietNam'
      },
      {
        code: 'cn',
        name:'Chinese'
      },
      {
        code: 'th',
        name:'Thailand'
      }];
    let currentLangCode = cookies.get("i18next") || 'en';
    return (
        <>
         <div className="current_flag"> <img src={`https://cdn.hanwei1234.com/Content/images/${currentLangCode}.svg`} alt="" /></div>
         <ul>
         {listLang.map((lang,index) =>{
           let togleHide = lang.code === currentLangCode ? "none" : "";
             return <li key={index} style={{display:togleHide}}>
                <span>{lang.name}</span>
                <img onClick={()=>i18n.changeLanguage(lang.code)} src={`https://cdn.hanwei1234.com/Content/images/${lang.code}.svg`} alt="" />
                </li>
         })}
         </ul>
        </>
    )
}

export default Language
