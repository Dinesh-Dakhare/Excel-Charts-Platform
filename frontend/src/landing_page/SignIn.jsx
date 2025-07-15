import React, { useState } from 'react';
import './Account.css';

function SignIn({ toggleForm }) {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginInfo({ email: '', password: '' });
    };

    return (
        <div className="auth-box glass">
            <h2 className="form-title">Sign In</h2>


            <form onSubmit={handleSubmit}>
                <div className="input-icon-wrapper">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                        type="email"
                        name="email"
                        value={loginInfo.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                    />
                </div>

                <div className="input-icon-wrapper">
                    <i class="fa-solid fa-lock"></i>
                    <input
                        type="password"
                        name="password"
                        value={loginInfo.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        required
                    />
                </div>

                <a href="#" className="forgot">Forgot Password?</a>

                <button className="submit-btn">Sign In</button>
            </form>

            <p className="switch-form">
                Don't have an account? <span onClick={toggleForm}>Sign Up</span>
            </p>

            <div className="divider"><span>or</span></div>

            <div className="branded-buttons">
                <button className="google-auth-btn">
                    <img src="media/images/googleLogo.png" alt="Google" />
                    CONTINUE WITH GOOGLE
                </button>
                <button className="apple-auth-btn">
                    <img src="media/images/appleLogo.jpg" alt="Apple" />
                    CONTINUE WITH APPLE
                </button>
            </div>
        </div>
    );
}

export default SignIn;