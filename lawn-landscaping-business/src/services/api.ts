import { supabase } from '../lib/supabaseClient'
import { Database } from '../lib/supabaseSchema'

type Tables = Database['public']['Tables']

export const api = {
  // Areas
  getAreas: async () => {
    const { data, error } = await supabase.from('areas').select('*')
    if (error) throw error
    return data as Tables['areas']['Row'][]
  },
  
  // Contract Changes
  getContractChanges: async () => {
    const { data, error } = await supabase.from('contract_changes').select('*')
    if (error) throw error
    return data as Tables['contract_changes']['Row'][]
  },
  
  // Contract Services
  getContractServices: async () => {
    const { data, error } = await supabase.from('contract_services').select('*')
    if (error) throw error
    return data as Tables['contract_services']['Row'][]
  },
  
  // Contracts
  getContracts: async () => {
    const { data, error } = await supabase.from('contracts').select('*')
    if (error) throw error
    return data as Tables['contracts']['Row'][]
  },
  
  // Customers
  getCustomers: async () => {
    const { data, error } = await supabase.from('customers').select('*')
    if (error) throw error
    return data as Tables['customers']['Row'][]
  },
  
  // Proposals
  getProposals: async () => {
    const { data, error } = await supabase.from('proposals').select('*')
    if (error) throw error
    return data as Tables['proposals']['Row'][]
  },
  
  // Services
  getServices: async () => {
    const { data, error } = await supabase.from('services').select('*')
    if (error) throw error
    return data as Tables['services']['Row'][]
  },

  // Add a single item
  addItem: async <T extends keyof Tables>(
    table: T,
    item: Tables[T]['Insert']
  ) => {
    const { data, error } = await supabase.from(table).insert(item).select()
    if (error) throw error
    return data[0] as Tables[T]['Row']
  },

  // Update a single item
  updateItem: async <T extends keyof Tables>(
    table: T,
    id: number,
    updates: Partial<Tables[T]['Update']>
  ) => {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0] as Tables[T]['Row']
  },

  // Delete a single item
  deleteItem: async <T extends keyof Tables>(table: T, id: number) => {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw error
  },
}
