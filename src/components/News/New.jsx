import  { useEffect,useContext } from 'react'
import { NewsContext } from '../../NewsContext';
import axios from 'axios';

require('dotenv').config();

function New() {
    const {newsdata,setNewsdata} = useContext(NewsContext)

    useEffect(() => {
            if(newsdata === null){
                // const APIKEY = process.env.REACT_APP_MY_APIKEY;
                // function timeFomat1(now) {
                //     let day = `0${now.getDate()}`.slice(-2);
                //     let month = `0${now.getMonth() + 1}`.slice(-2);
                //     let year = `${now.getFullYear()}`
                //     return `${year}-${month}-${day - 2}`
                // }
                // function timeFomat2(now) {
                //     let day = `0${now.getDate()}`.slice(-2);
                //     let month = `0${now.getMonth() + 1}`.slice(-2);
                //     let year = `${now.getFullYear()}`
                //     return `${year}-${month}-${day}`
                // }
                // let fromDay = timeFomat1(new Date());
                // let toDay = timeFomat2(new Date());
                // https://stackoverflow.com/questions/62232828/uncaught-in-promise-error-request-failed-with-status-code-426-in-react-app-ne
                // let apiNews = `https://newsapi.org/v2/everything?q=apple&from=${fromDay}&to=${toDay}&sortBy=popularity&apiKey=${APIKEY}`;
                axios({
                    method: 'get',
                    url: `https://61ba98d748df2f0017e5ab32.mockapi.io/api/test-news/v1/news-testing`,
                })
               
                    .then(function (response) {
                        setNewsdata(response.data[0].articles) ;
                    });
            }
    })

    let newsDOM
    if (newsdata && newsdata.length > 0) {
        newsDOM = newsdata.map((ne, index) => {
            let excerp;
            if (ne.description.charAt(90) !== undefined) {
                excerp = ne.description.slice(0, 90) + "...";
            } else {
                excerp = ne.description;
            }
            return <div key={index} className="News_Box">
                <img src={ne.urlToImage} alt="" />
                <h2>{ne.title}</h2>
                <p>{excerp}</p>
                <div className="News_Bottom">
                    <span>Author: {ne.author !== null ? ne.author : "Anonymous"}</span>
                    <a href={ne.url} target="_blank" rel="noreferrer">Read More</a>
                </div>
            </div>
        });

    }
    
    return (
        <div className="News_Container">
            <div className="News_Title">

            </div>
            <div className="News_container">
                {newsDOM}
            </div>

        </div>
    )
}

export default New
