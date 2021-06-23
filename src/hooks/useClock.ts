
import { useEffect, useState } from 'react'


function timeFomat(now:Date){
    let day = `0${now.getDate()}`.slice(-2);
    let month = `0${now.getMonth()+1}`.slice(-2);
    let year = `${now.getFullYear()}`;
    let sec = `0${now.getSeconds()}`.slice(-2);
    let min = `0${now.getMinutes()}`.slice(-2);
    let hour = `0${now.getHours()}`.slice(-2);
    return `${day}/${month}/${year}, ${hour}:${min}:${sec}`
}

function useClock() {
    const [time,setTime] = useState<any>()
    useEffect(() => {
       
        const Interval = setInterval(()=>{
            const now:Date = new Date();
            let timing = timeFomat(now);
            setTime(timing);
        },1000)

        
        return()=>{
            clearInterval(Interval);
        }
    }, [])
    return {time}
}

export default useClock
