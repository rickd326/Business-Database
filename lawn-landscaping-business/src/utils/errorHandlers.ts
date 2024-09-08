import { PostgrestError } from '@supabase/supabase-js';
import { SupabaseError } from './SupabaseError.ts';

export function handleSupabaseError(error: PostgrestError | null): SupabaseError {
  if (!error) {
    return new SupabaseError('Unknown error occurred');
  }

  return new SupabaseError(
    error.message,
    error.code,
    error.details,
    error.hint,
    error
  );
}

export function isSupabaseError(error: any): error is SupabaseError {
  return error instanceof SupabaseError;
}
