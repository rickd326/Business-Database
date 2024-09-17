import { supabase } from './supabaseClient';

export default async function getUser() {
    const user = supabase.auth.user();
    if (user) {
        return user.id;  // This is the userId
    }
    return null;
}
