import React, { useState } from 'react';
import './Account.css';

function SignUp({ toggleForm }) {
    const [signUpInfo, setSignUpInfo] = useState({
        name: '', email: '', password: '', confirmPass: ''
    });

    const handleInputChange = (e) => {
        setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSignUpInfo({ name: '', email: '', password: '', confirmPass: '' });
        toggleForm();
    };

    return (
        <div className="auth-box glass">
            <h2>Create Account</h2>


            <form onSubmit={handleSubmit}>
                <div className="input-icon-wrapper">
                    <i className="fa-solid fa-user"></i>
                    <input
                        type="text"
                        name="name"
                        value={signUpInfo.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        required
                    />
                </div>

                <div className="input-icon-wrapper">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                        type="email"
                        name="email"
                        value={signUpInfo.email}
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
                        value={signUpInfo.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        required
                    />
                </div>

                <div className="input-icon-wrapper">
                    <i class="fa-solid fa-unlock"></i>
                    <input
                        type="password"
                        name="confirmPass"
                        value={signUpInfo.confirmPass}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        required
                    />
                </div>

                <button className="submit-btn">Sign Up</button>
            </form>

            <p className="switch-form">
                Already have an account? <span onClick={toggleForm}>Sign In</span>
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


export default SignUp;