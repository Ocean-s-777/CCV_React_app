import React from 'react'

function Signup() {
    return (
        <div>
            <div className="">
                <h1>CREATE ACCOUNT</h1>
            </div>
            <div className="">
                <div>
                    <label>Username</label>
                    <input type="text" placeholder="Username" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Password" />
                </div>
                <button type="submit" className=''>Sign Up</button>
            </div>
            <a href="./Login">
                <p>Log In</p>
            </a>
        </div>
    )
}
export default Signup;