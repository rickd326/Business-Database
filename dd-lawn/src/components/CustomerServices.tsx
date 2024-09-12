import React, { useEffect, useState } from 'react';
import { ActiveContractServicesRow } from '../types';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

interface CustomerServicesProps {
  customerId: string;
}

const CustomerServices: React.FC<CustomerServicesProps> = ({ customerId }) => {
    const [services, setServices] = useState<ActiveContractServicesRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchServices = async () => {
        try {
          const { data, error } = await supabase
            .from('active_contract_services')
            .select('*')
            .eq('customer_id', customerId)
            .eq('active', true);
  
          if (error) throw error;
          setServices(data);
        } catch (error) {
          console.error('Failed to fetch services:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchServices();
    }, [customerId]);

  return (
    <div>
      <h1>Active Services</h1>
      {services.length > 0 ? (
        <ul>
          {services.map(service => (
            <li key={service.contract_service_id}>
              {service.custom_description || 'No description'} - Status: {service.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No active services found for this customer.</p>
      )}
    </div>
  );
};

export default CustomerServices;
