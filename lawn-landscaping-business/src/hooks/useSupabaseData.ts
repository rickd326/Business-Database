import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function useSupabaseData(table: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from(table).select('*');
      if (error) throw error;
      setData(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [table]);

  return { data, loading, error, fetchAll };
}
