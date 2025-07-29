import React, { useState } from 'react';
import './Account.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

function Account() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleLogin = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className='account-container'>
            {isLogin ? (
                <SignIn toggleForm={toggleLogin} />
            ) : (
                <SignUp toggleForm={toggleLogin} />
            )}
        </div>
    );
}

export default Account;
