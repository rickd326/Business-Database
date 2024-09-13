import React, { useEffect, useState } from 'react';
import { ActiveContractServicesRow } from '../types';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import StyledSection from '../ui/StyledSection';
import {TableHeader, TableCell} from '../ui/TableStyles';

interface CustomerServicesProps {
  customerId: string;
}

export function CustomerServices({ customerId }: CustomerServicesProps) {
  const [services, setServices] = useState<ActiveContractServicesRow[]>([]); // Define state for services
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
  <>
      <StyledSection title="Customer Services">
        <p className="text-gray-600">Services for Customer {customerId}</p>
      </StyledSection>
      <StyledSection title="Customer Services" isTable={true}>
        <table className="min-w-half divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
            <TableHeader text="Description" />
            <TableHeader text="Status" />
            <TableHeader text="Price" />
            <TableHeader text="Quantity" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {services.map((service) => (
            <tr key={service.contract_service_id}>
              <TableCell>{service.custom_description}</TableCell>
              <TableCell>{service.status}</TableCell>
              <TableCell>{service.custom_price?.toFixed(2) ?? 'N/A'}</TableCell>
              <TableCell>{service.quantity}</TableCell> 
            </tr>
          ))}
        </tbody>
      </table>

      </StyledSection>
    </>
  );
}

export default CustomerServices;
