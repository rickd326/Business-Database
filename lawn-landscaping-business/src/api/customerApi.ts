import { supabase } from '../lib/supabaseClient';
import { Customer } from '../types';

export const getCustomers = async (): Promise<Customer[]> => {
  const { data, error } = await supabase
    .from('customers')
    .select('*');
  if (error) throw error;
  return data;
};

export const searchCustomers = async (searchTerm: string): Promise<Customer[]> => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .or(`last_name.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,phone_1.ilike.%${searchTerm}%,phone_2.ilike.%${searchTerm}%`);
  if (error) throw error;
  return data;
};

export const updateCustomer = async (customer: Customer): Promise<void> => {
  const { error } = await supabase
    .from('customers')
    .update(customer)
    .eq('id', customer.customer_id);
  if (error) throw error;
};

export const addCustomer = async (customer: Partial<Customer>): Promise<void> => {
  const { error } = await supabase
    .from('customers')
    .insert(customer);
  if (error) throw error;
};
