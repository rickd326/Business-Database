import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Button from '../ui/ButtonTw';
import Input from '../ui/InputTw';

interface Service {
  id: string;
  name: string;
}

interface AddCustomerServiceProps {
  customerId: string;
  onServiceAdded: () => void; // Callback when a service is successfully added
}

export function AddCustomerService({ customerId, onServiceAdded }: AddCustomerServiceProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');

  useEffect(() => {
    async function fetchServices() {
      const response = await fetch('/api/services'); // Adjust API endpoint as needed
      const data: Service[] = await response.json();
      setServices(data);
      if (data.length > 0) {
        setSelectedServiceId(data[0].id); // Optionally set the first service as selected by default
      }
    }

    fetchServices();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { error } = await supabase
        .from('contract_services')
        .insert([
          {
            service_id: selectedServiceId,
            customer_id: customerId,
          }
        ]);

      if (!error) {
        onServiceAdded();
      }
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="serviceDropdown">Select Service:</label>
      <select
        id="serviceDropdown"
        value={selectedServiceId}
        onChange={(e) => setSelectedServiceId(e.target.value)}
      >
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Service</button>
    </form>
  );
}

export default AddCustomerService;
