import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Database } from '../lib/supabaseSchema';

type Customer = Database['public']['Tables']['customers']['Row'];

interface CustomerCreateProps {
  onClose: () => void;
}

const CustomerCreate: React.FC<CustomerCreateProps> = ({ onClose }) => {
  const [customer, setCustomer] = useState<Partial<Customer>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure required fields are not undefined
    if (!customer.first_name || !customer.last_name) {
      alert('First Name and Last Name are required.');
      return;
    }

    const { data, error } = await supabase
      .from('customers')
      .insert([customer as Customer]) // Cast to Customer since required fields are checked
      .select();

    if (error) console.error('Error creating customer:', error);
    else {
      alert('Customer created successfully!');
      onClose();
    }
  };

  return (
    <div className="modal">
      <h2>Create New Customer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={customer.first_name || ''}
          onChange={(e) => setCustomer({ ...customer, first_name: e.target.value })}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={customer.last_name || ''}
          onChange={(e) => setCustomer({ ...customer, last_name: e.target.value })}
          placeholder="Last Name"
          required
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
        <button type="submit">Create Customer</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default CustomerCreate;
