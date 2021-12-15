import {useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import NProgress from 'react-nprogress'



function Nprobar() {
    useEffect(() => {
        NProgress.configure({ showSpinner: false});
        NProgress.set(0.4)
        NProgress.start();
    
        return () => {
            NProgress.configure({ showSpinner: false});
            NProgress.set(1.0)
            NProgress.done();
        };
    });
    
    let sampleDiv = "images";
    let listDivs = [];
    for (let i = 0; i <= 12; i++) {
        listDivs.push(sampleDiv)
    }
    let preDom = listDivs.map((listDiv, index) => {
        return <div key={index} className="News_Box"> <Skeleton height={458}/></div>
    });
    let PreContainer =
        <div className="News_Container">
            <div className="News_Title">

            </div>
            <div className="News_container">
               {preDom}
                {/* {Array(20)
                    .fill("i")
                    .map((item, index) => {
                        <div key={index} data-f={item} className="News_Box">
                            <Skeleton height={200} />
                        </div>
                    })} */}
            </div>

        </div>
    return (
        <>
            {PreContainer}
        </>
    )
}

export default Nprobar
