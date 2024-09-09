import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerServices, updateService } from '../api/serviceApi';
import { Service } from '../types';

function CustomerServicesPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, [customerId]);

  const fetchServices = async () => {
    if (customerId) {
      const data = await getCustomerServices(parseInt(customerId));
      setServices(data);
    }
  };

  const handleEditService = async (service: Service) => {
    await updateService(service);
    fetchServices();
  };

  return (
    <div>
      <h1>Customer Services</h1>
      {services.map(service => (
        <div key={service.service_id}>
          {/* Display service details */}
          <button onClick={() => handleEditService(service)}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default CustomerServicesPage;
