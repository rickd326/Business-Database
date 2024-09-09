import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomers, searchCustomers } from '../api/customerApi';
import { Customer, Area } from '../types';
import CustomerEditModal from './CustomerEditModal';
import CustomerAddModal from './CustomerAddModal';

function CustomerListView() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
    setFilteredCustomers(data);
  };

  const handleSearch = async () => {
    const results = await searchCustomers(searchTerm);
    setFilteredCustomers(results);
  };

  const handleAreaFilter = (areaId: number) => {
    setSelectedArea({ area_id: areaId } as Area);
    setFilteredCustomers(customers.filter(c => c.area_id === areaId));
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditCustomer(customer);
  };

  const handleAddCustomer = () => {
    setIsAddModalOpen(true);
  };

  const handleGoToServices = (customerId: number) => {
    navigate(`/customer/${customerId}/services`);
  };

  return (
    <div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Search customers..."
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleAddCustomer}>Add Customer</button>
      
      {/* Area filter dropdown */}
      {/* ... */}

      {filteredCustomers.map(customer => (
        <div key={customer.customer_id}>
          {/* Customer info */}
          <button onClick={() => handleEditCustomer(customer)}>Edit</button>
          <button onClick={() => handleGoToServices(customer.customer_id)}>Services</button>
        </div>
      ))}

      {editCustomer && (
        <CustomerEditModal 
          customer={editCustomer} 
          onClose={() => setEditCustomer(null)}
          onSave={fetchCustomers}
        />
      )}

      {isAddModalOpen && (
        <CustomerAddModal 
          onClose={() => setIsAddModalOpen(false)}
          onSave={fetchCustomers}
        />
      )}
    </div>
  );
}

export default CustomerListView;
