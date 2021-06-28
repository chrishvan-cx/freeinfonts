import  { useEffect, useState } from 'react'
import axios from 'axios';
require('dotenv').config();

function News() {
    const [news, setNews] = useState<any>()
    const APIKEY = process.env.REACT_APP_MY_APIKEY;
    function timeFomat1(now: Date) {
        let day: any = `0${now.getDate()}`.slice(-2);
        let month = `0${now.getMonth() + 1}`.slice(-2);
        let year = `${now.getFullYear()}`
        return `${year}-${month}-${day - 2}`
    }
    function timeFomat2(now: Date) {
        let day = `0${now.getDate()}`.slice(-2);
        let month = `0${now.getMonth() + 1}`.slice(-2);
        let year = `${now.getFullYear()}`
        return `${year}-${month}-${day}`
    }
    useEffect(() => {

        let fromDay = timeFomat1(new Date());
        let toDay = timeFomat2(new Date());
        axios({
            method: 'get',
            url: `https://newsapi.org/v2/everything?q=apple&from=${fromDay}&to=${toDay}&sortBy=popularity&apiKey=${APIKEY}`,
        })
            .then(function (response) {
                setNews(response.data.articles);

            });

    }, [APIKEY])

    let newsDOM
    if (news && news.length > 0) {
        newsDOM = news.map((ne: any, index: any) => {
            let excerp: string;
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
                    <span>Author: {ne.author}</span>
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

export default News
