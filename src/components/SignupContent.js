import React from 'react'

function SignupContent() {
    return (
        <>
        <div>
            <div className="">
                <h1>CREATE ACCOUNT</h1>
            </div>
            <form onSubmit={ handleSignupSubmit }>
            <div className="">
                <div>
                    <label>Username</label>
                    <input type="text" placeholder="Username" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Password" />
                </div>
                <div>
                    { signupUIControls }
                </div>
        </div>
        </form>
        </div>

    </>
    )
}
export default SignupContent;