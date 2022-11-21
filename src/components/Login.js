import React from 'react'

function Login() {
    return (
        <div className="">
            <h1>Sign into Your Account</h1>
            <div className="">
                <form action="#" method="post">
                    <div>
                        <input type="text" name="user" placeholder="Email Address" className="input-email" />
                    </div>
                    <div>
                        <input type="password" name="password" id="" placeholder="Password" className="input-password" />
                    </div>
                    <a href="#">
                        <p>Forgot Password?</p>
                    </a>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    )
}
export default Login;