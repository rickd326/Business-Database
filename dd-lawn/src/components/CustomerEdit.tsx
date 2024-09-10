import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Database } from '../lib/supabaseSchema';

type Customer = Database['public']['Tables']['customers']['Row'];

interface CustomerEditProps {
  customerId: number;
  onClose: () => void;
}

const CustomerEdit: React.FC<CustomerEditProps> = ({ customerId, onClose }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomer();
  }, [customerId]);

  const fetchCustomer = async () => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('customer_id', customerId)
      .single();
    
    if (error) console.error('Error fetching customer:', error);
    else setCustomer(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customer) return;

    const { error } = await supabase
      .from('customers')
      .update(customer)
      .eq('customer_id', customerId);

    if (error) console.error('Error updating customer:', error);
    else {
      alert('Customer updated successfully!');
      onClose();
    }
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="modal">
      <h2>Edit Customer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={customer.first_name}
          onChange={(e) => setCustomer({ ...customer, first_name: e.target.value })}
          placeholder="First Name"
        />
        <input
          type="text"
          value={customer.last_name}
          onChange={(e) => setCustomer({ ...customer, last_name: e.target.value })}
          placeholder="Last Name"
        />
        <input
          type="text"
          value={customer.street_address || ''}
          onChange={(e) => setCustomer({ ...customer, street_address: e.target.value })}
          placeholder="Street Address"
        />
        <input
          type="text"
          value={customer.phone_1 || ''}
          onChange={(e) => setCustomer({ ...customer, phone_1: e.target.value })}
          placeholder="Phone 1"
        />
        <input
          type="text"
          value={customer.phone_2 || ''}
          onChange={(e) => setCustomer({ ...customer, phone_2: e.target.value })}
          placeholder="Phone 2"
        />
        <button type="submit">Update Customer</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default CustomerEdit;
