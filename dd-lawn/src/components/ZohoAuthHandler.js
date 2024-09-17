import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { exchangeCodeForTokens } from '../api/zohoAuth'; // Assume this function handles the exchange
import { storeRefreshToken } from '../api/storeRefreshToken';

const ZohoAuthHandler = () => {
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const handleAuth = async () => {
            const queryParams = new URLSearchParams(location.search);
            const code = queryParams.get('code');
            if (code) {
                try {
                    const { accessToken, refreshToken, userId } = await exchangeCodeForTokens(code);
                    await storeRefreshToken(userId, refreshToken);
                    // Redirect or further actions
                    history.push('/dashboard');
                } catch (error) {
                    console.error('Authentication error:', error);
                    // Handle errors, e.g., show a message, redirect
                }
            }
        };

        handleAuth();
    }, [location, history]);

    return (
        <div>Loading...</div>
    );
};

export default ZohoAuthHandler;
