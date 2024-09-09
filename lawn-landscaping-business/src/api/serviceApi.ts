import { supabase } from '../lib/supabaseClient';
import { Service } from '../types';

export const getCustomerServices = async (customerId: number): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('customer_id', customerId);
  if (error) throw error;
  return data;
};

export const updateService = async (service: Service): Promise<void> => {
  const { error } = await supabase
    .from('services')
    .update(service)
    .eq('id', service.service_id);
  if (error) throw error;
};
