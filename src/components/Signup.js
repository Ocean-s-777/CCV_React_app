import React from 'react'

function Signup() {
    return (
        <div>
            <div className="">
                <h1>SIGN UP YOUR ACCOUNT</h1>
            </div>
            <div className="">
                <div>
                    <label>User Name</label>
                    <input type="text" placeholder="User Name" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Password" />
                    <label>Re-Enter Password</label>
                    <input type="password" placeholder="Confirm Password" />
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