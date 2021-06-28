import React, { useRef, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import { reducerAccount } from '../Reducer'

// Not using
function SignUp() {
    const [state, dispatch] = useReducer(reducerAccount, []);
    const [active, setActive] = useState(false)

    const emailRef = useRef(null);
    const passRef = useRef(null);


    const handleRegister = () => {
        const member = [emailRef, passRef]
        dispatch({ type: 'register', info: member })
    }

    return (
        <div className="SignUp_Wrapper">
            <button onClick={() => setActive(!active)}>SingUp</button>
            <div className="formBox">
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
                    <button type='submit' onClick={handleRegister}>Login</button>
                </form>
                <div>
                    <Link href="/signIn">
                        <b>signup here</b>
                    </Link>
                </div>
                {state.Member}
            </div>
        </div>
    )
}

export default SignUp
