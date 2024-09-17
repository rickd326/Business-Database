import { supabase } from './supabaseClient';

export async function storeRefreshToken(userId, refreshToken) {
    const { data, error } = await supabase
        .from('auth.refresh_tokens')
        .insert([
            { user_id: userId, refresh_token: refreshToken }
        ]);

    if (error) {
        console.error('Error storing refresh token:', error);
        throw error;
    }
    return data;
}
