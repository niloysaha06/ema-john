import React from 'react';
import './Login.css'
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';

const Login = () => {
    const { signInUsingGoogle} = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/shop';
    console.log('came from', location.state?.from); 

    const handleGoogleLogin = () => {
        signInUsingGoogle()
        .then(result => {
            history.push(redirect_uri);
        })
    }


    return (
        <div className='login-form'>
            <div>
                <h2>Login</h2>
                <form onSubmit="">
                    <input type="email" name="" id="" placeholder="Your Email"/>
                    <br />
                    <input type="password" name="" id="" placeholder="Your Password"/>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
                <p>new to ema-john? <Link to="/register">Create Account</Link></p>
                <div>---------Or----------</div>
                <button onClick={handleGoogleLogin} className='btn-regular'>Google Sign In</button>
            </div>
        </div>
    );
};

export default Login;