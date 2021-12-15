import Cookies from 'js-cookie';
import { useRef, useReducer, useState, useEffect, memo } from 'react'
import { reducerAccount } from '../Reducer'

function Account() {
    const [active, setActive] = useState(0);
    const [logStatus, setLogStatus] = useState(false);
    const [member, setMember] = useState({});
    const [state, dispatch] = useReducer(reducerAccount);
    const userRef = useRef(null);
    const passRef = useRef(null);
    const userRef2 = useRef(null);
    const passRef2 = useRef(null);
    const detectedRefs1 = useRef()
    const detectedRefs2 = useRef()


    // detectedRefs.current = [0,0].map(
    //     (ref, index) =>   detectedRefs.current[index] = React.createRef()
    //     )
    useEffect(() => {

        const accFromCookie = Cookies.get('account');
        if (accFromCookie && accFromCookie !== "") {
            setMember(JSON.parse(accFromCookie));
            setLogStatus(true);
            
        }
        // const store = JSON.parse(localStorage.getItem('acc'));
        // const cook = JSON.parse(Cookies.get('account'));
        // console.log( "state",typeof state , state)

        function eventClick(e) {
            // console.log(detectedRefs);
            // [0,0].map((e,index) => {
            //     console.log("You clicked outside of me", index, detectedRefs.current ,active);
            //     // if (  detectedRefs.current[index] && !detectedRefs.current[index].contains(e.target)) {
            //     //             console.log("You clicked outside of me", index, detectedRefs.current[index] ,active);
            //     //             setActive(0)
            //     //         }
            //     return ''
            //   });
            //    console.log("click",detectedRefs1.current,detectedRefs2)
            if (active === 1 && detectedRefs1.current && !detectedRefs1.current.contains(e.target)) {
                setActive(0)
            }
            else if (active === 2 && detectedRefs2.current && !detectedRefs2.current.contains(e.target)) {
                setActive(0)
            }
        }
        document.addEventListener('mousedown', eventClick);
        return () => {
            document.removeEventListener('mousedown', eventClick);
        }
    }, [active])


    const handleRegister = (e) => {
        e.preventDefault();
        const member = { username: userRef.current.value, password: passRef.current.value }
        dispatch({ type: 'register', info: member })
        userRef.current.value = null;
        passRef.current.value = null;
        setActive(0);
    }


    function handleLogin(e) {
        e.preventDefault();
        let userLogin = userRef2.current.value;
        let userPass = passRef2.current.value;
        let dataBase = JSON.parse(localStorage.getItem('account'));
        if(userLogin === dataBase.username && userPass === dataBase.password){
            setMember(dataBase);
            setLogStatus(true);
            Cookies.set('account',dataBase);
            window.location.reload("true")
        }else{
            alert("Usename or password incorrect!");
        }
        
    }
    function handleLogOut() {
        Cookies.remove('account');
        window.location.reload("true")
    }
    function handleToggleForm(num) {
        switch (num) {
            case 1: active === 1 ? setActive(0) : setActive(num); break;
            case 2: active === 2 ? setActive(0) : setActive(num); break;
            default: break;
        }
    }
    
    return (
        <>
        <div style={{display:"none"}}>{state}</div>
            {logStatus === true ?
                <div className="Logout" >
                    <a href="/#">Hi {member ? member.username : ""} </a>
                    <div className='logout-btn'>
                        <button style={{marginLeft : "10px"}} onClick={() => handleLogOut()}>LogOut</button>
                    </div>
                </div> :
                <>
                    <div ref={detectedRefs1} className="SignIn_Wrapper">
                        <button className='btn-signin' onClick={() => handleToggleForm(1)}>SignIn</button>
                        <div className={active === 1 ? "formBox active" : "formBox"}>
                            <form action="">
                                <label htmlFor="email">
                                    <span>Email:</span>
                                    <input type="text" placeholder="Email" ref={userRef2} />
                                </label>
                                <label htmlFor="password">
                                    <span>Password:</span>
                                    <input type="password" placeholder="Password" ref={passRef2} />
                                </label>
                                <br />
                                <div className='btn-submit'>
                                <button type='submit' onClick={handleLogin}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div ref={detectedRefs2} className="SignUp_Wrapper">
                        <button className='btn-signup' onClick={() => handleToggleForm(2)}>SingUp</button>
                        <div className={active === 2 ? "formBox active" : "formBox"}>
                            <form action="">
                                <label htmlFor="email">
                                    <span>Email:</span>
                                    <input type="text" placeholder="Email" ref={userRef} />
                                </label>
                                <label htmlFor="password">
                                    <span>Password:</span>
                                    <input type="password" placeholder="Password" ref={passRef} />
                                </label>
                                <br />
                                <div className='btn-submit'>
                                <button type='submit' onClick={handleRegister}>SignUp</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            }


        </>
    )
}

export default memo(Account)
