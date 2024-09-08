import { useState, useEffect } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabaseSchema';
import { getAll, getById, insertItem, updateItem, deleteItem } from '../utils/supabaseHelpers';

type Tables = Database['public']['Tables'];

export function useSupabaseData<T extends keyof Tables>(
  supabase: SupabaseClient<Database>,
  table: T
) {
  const [data, setData] = useState<Tables[T]['Row'][] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const result = await getAll(supabase, table);
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const fetchById = async (id: number) => {
    try {
      setLoading(true);
      const result = await getById(supabase, table, id);
      setData(result ? [result] : null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const insert = async (item: Tables[T]['Insert']) => {
    try {
      setLoading(true);
      const result = await insertItem(supabase, table, item);
      setData(prev => prev ? [...prev, result] : [result]);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: number, updates: Partial<Tables[T]['Update']>) => {
    try {
      setLoading(true);
      const result = await updateItem(supabase, table, id, updates);
      setData(prev => prev ? prev.map(item => item[`${table.slice(0, -1)}_id`] === id ? result : item) : [result]);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: number) => {
    try {
      setLoading(true);
      await deleteItem(supabase, table, id);
      setData(prev => prev ? prev.filter(item => item[`${table.slice(0, -1)}_id`] !== id) : null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchAll, fetchById, insert, update, remove };
}
