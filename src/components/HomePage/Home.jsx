import React, {  useEffect, useRef, useState } from 'react'
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';

import {  useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {

    const [fonts, setFonts] = useState(null);
    const [textCopied, setTextCopied] = useState("copy");
    const [search, setSearch] = useState("");
    const iconRef = useRef();
    const {t} = useTranslation()

    useEffect(() => {
        // fetch("https://resources.agentimage.com/fonts/agentimage.font.icons.css?ver=5.3.4")
        // .then(res => JSON.parse(res))
        // .then(result=> console.log(result))

        axios({
            method: 'get',
            url: 'https://resources.agentimage.com/fonts/agentimage.font.icons.css?ver=5.3.4'
        })
            .then(function (response) {
                let allData = response.data;
                let beginPos = allData.indexOf(".ai");
                let endPos = allData.indexOf("[");

                let allFonts = allData.slice(beginPos, endPos - 1).replaceAll(".", "");
                let arrFonts = allFonts.split(",");
                setFonts(arrFonts);
            });

    }, [])



    //Searh
    let fonts1
    function handleSearch(e) {
        setSearch(e.target.value);
    }
    if (fonts !== null && search !=="") {
        fonts1 = fonts.filter((font) => {
            return font.toLowerCase().indexOf(search) !== -1;
        });
    }else{
        fonts1 = fonts;
    }
    function showNotice(tag){
        toast.success(tag +' Copied!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }


    let fontRender;
    if (fonts1 && fonts1.length > 0) {
        fontRender = fonts1.map((font, index) => {
            let tag = `<i class="${font}"></i>`
            return <CopyToClipboard key={index} text={tag} options={{asHtml: true}} >
             <div  className="Fonts_Box" onClick={()=>showNotice(tag)}>
                <div className="Fonts_Box_Icon">
                    <span key={index} className={font}></span>
                </div>
                <pre title="Copy to clipboard">
                    <code ref={iconRef}>{`<i class=${font}></i>`}</code>
                </pre>
            </div>
            </CopyToClipboard>
        })
    }

   
    return (
        <div className="Home_Container">
            <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />
            <div className="Fonts_Title">
                <h1>YRB Fonts Icons</h1>
                <label htmlFor="">
                    <input
                        type="text"
                        name="search"
                        placeholder={t('search')}
                        value={search}
                        onChange={handleSearch} />
                    Search</label>
            </div>
            <div className="Fonts_container">
                {fontRender}
            </div>

        </div>
    )
}

export default Home

