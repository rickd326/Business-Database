import axios from 'axios';
import getUser from '../functions/getUser';  // Ensure this is correctly imported

const CLIENT_ID = '1000.332BZXWEKUUZF5M1U8NKFAO8FHVC7R';
const CLIENT_SECRET = '9d93d392bcbe72a6dde1ff7d43d2d7d46d8b262e24';
const REDIRECT_URI = 'http://localhost:3000/auth/callback/'; // Adjust according to your setup

export async function exchangeCodeForTokens(code) {
    const url = 'https://accounts.zoho.com/oauth/v2/token';
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('redirect_uri', REDIRECT_URI);
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('scope', 'ZohoBooks.fullaccess.all');
    params.append('access_type', 'offline');
    params.append('prompt', 'consent');

    try {
        const userId = await getUser();  // Fetch the user ID from Supabase
        if (!userId) {
            throw new Error('User not logged in or session expired');
        }

        const response = await axios.post(url, params);
        const { access_token, refresh_token } = response.data;
        return { accessToken: access_token, refreshToken: refresh_token, userId };
    } catch (error) {
        console.error('Error in exchangeCodeForTokens:', error);
        throw new Error('Authentication failed: ' + error.message);
    }
}
