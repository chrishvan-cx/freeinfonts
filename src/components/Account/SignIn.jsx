import  { useRef, useState } from 'react'
import { Link } from 'react-router-dom'


// Not using
function SignIn() {
    const [active, setActive] = useState(false)

    const emailRef = useRef(null);
    const passRef = useRef(null);
    function handleLogin() {

    }

    return (
        <div className="SignIn_Wrapper">
            <button onClick={() => setActive(!active)}>SignIn</button>
            <div className={active === true ? "formBox active" : "formBox"}>
                <form action="">
                    <label htmlFor="email">
                        <p>Email:</p>
                        <input type="text" placeholder="emial" ref={emailRef} />
                    </label>
                    <label htmlFor="password">
                        <p>Password:</p>
                        <input type="password" placeholder="password" ref={passRef} />
                    </label>
                    <br />
                    <p></p>
                    <button type='submit' onClick={handleLogin}>Login</button>
                </form>
                <div>
                    <Link href="/signIn">
                        <b>signup here</b>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn
