import React, { useEffect, useState } from 'react';
import { ActiveContractServicesRow } from '../types';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'


const CustomerServices: React.FC = () => {
  const [services, setServices] = useState<ActiveContractServicesRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { customerId } = useParams<{ customerId: string }>();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`/api/services/active/${customerId}`);
        const data: ActiveContractServicesRow[] = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [customerId]);

  if (isLoading) return <p>Loading...</p>;

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
