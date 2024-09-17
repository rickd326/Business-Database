import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Auth = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = isLogin
                ? await supabase.auth.signIn({ email, password })
                : await supabase.auth.signUp({ email, password });

            if (error) throw error;
            alert('Authentication successful!');
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need to create an account?' : 'Already have an account?'}
            </button>
        </div>
    );
};

export default Auth;
