import { SupabaseClient, PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js'
import { Database } from '../types/supabaseSchema'

type Tables = Database['public']['Tables']

// Generic function to get all items from a table
export async function getAll<T extends keyof Tables>(
  supabase: SupabaseClient<Database>,
  table: T
): Promise<Tables[T]['Row'][]> {
  const { data, error } = await supabase.from(table).select('*')
  if (error) throw error
  return (data as unknown) as Tables[T]['Row'][]
}

// Generic function to get a single item by ID
export async function getById<T extends keyof Tables>(
  supabase: SupabaseClient<Database>,
  table: T,
  id: number
): Promise<Tables[T]['Row'] | null> {
  const result: PostgrestSingleResponse<Tables[T]['Row']> = await supabase
    .from(table)
    .select('*')
    .eq(`${table.slice(0, -1)}_id`, id)
    .single()
  
  if (result.error) {
    if (result.error.code === 'PGRST116') {
      return null
    }
    throw result.error
  }
  
  return result.data
}

// Generic function to insert a new item
export async function insertItem<T extends keyof Tables>(
  supabase: SupabaseClient<Database>,
  table: T,
  item: Tables[T]['Insert']
): Promise<Tables[T]['Row']> {
  const result = await supabase
    .from(table)
    .insert(item as any) // Use 'any' to bypass strict type checking
    .select()

  if (result.error) throw result.error
  if (!result.data || result.data.length === 0) throw new Error('No data returned after insert')
  
  return (result.data[0] as unknown) as Tables[T]['Row']
}

// Generic function to update an item
export async function updateItem<T extends keyof Tables>(
  supabase: SupabaseClient<Database>,
  table: T,
  id: number,
  updates: Partial<Tables[T]['Update']>
): Promise<Tables[T]['Row']> {
  const result = await supabase
    .from(table)
    .update(updates as any)
    .eq(`${table.slice(0, -1)}_id`, id)
    .select()

  if (result.error) throw result.error
  if (!result.data || result.data.length === 0) throw new Error('No data returned after update')
  
  return (result.data[0] as unknown) as Tables[T]['Row']
}

// Generic function to delete an item
export async function deleteItem<T extends keyof Tables>(
  supabase: SupabaseClient<Database>,
  table: T,
  id: number
): Promise<void> {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq(`${table.slice(0, -1)}_id`, id)
  if (error) throw error
}

// Generic function for pagination
export async function getPaginated<T extends keyof Tables>(
  supabase: SupabaseClient<Database>,
  table: T,
  page: number,
  pageSize: number
): Promise<{ data: Tables[T]['Row'][]; count: number | null; page: number; pageSize: number }> {
  const start = page * pageSize
  const end = start + pageSize - 1

  const { data, error, count } = await supabase
    .from(table)
    .select('*', { count: 'exact' })
    .range(start, end)

  if (error) throw error
  return { 
    data: (data as unknown) as Tables[T]['Row'][], 
    count,
    page,
    pageSize 
  }
}
