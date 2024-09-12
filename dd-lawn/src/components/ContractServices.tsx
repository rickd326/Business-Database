import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'; // Corrected path
import { ContractService } from '../types'; // Import the interface

export default function ContractServices() {
  const { contractId } = useParams<{ contractId: string }>();
  const [services, setServices] = useState<ContractService[]>([]); // Use the ContractService interface

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('contract_services') // Remove the generic type parameters
        .select('*')
        .eq('contract_id', parseInt(contractId || '0')); // Ensure contractId is a number

      if (error) console.error('Error loading services', error);
      else setServices(data || []);
    };

    fetchServices();
  }, [contractId]);

  return (
    <div>
      <h1>Contract Services</h1>
      <ul>
        {services.map(service => (
          <li key={service.contract_service_id}>
            {service.service_id} - {service.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
