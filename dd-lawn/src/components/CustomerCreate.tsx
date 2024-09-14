import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Database } from '../lib/supabaseSchema';
import Button from '../ui/ButtonTw';
import Input from '../ui/InputTw';

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
    <div className="max-w-4xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Customer</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={customer.first_name || ''}
          onChange={(e) => setCustomer({ ...customer, first_name: e.target.value })}
          placeholder="First Name"
         
        />
        <Input
          type="text"
          value={customer.last_name || ''}
          onChange={(e) => setCustomer({ ...customer, last_name: e.target.value })}
          placeholder="Last Name"
          required
        />
        <Input
          type="text"
          value={customer.street_address || ''}
          onChange={(e) => setCustomer({ ...customer, street_address: e.target.value })}
          placeholder="Street Address"
        />
        <Input
          type="text"
          value={customer.phone_1 || ''}
          onChange={(e) => setCustomer({ ...customer, phone_1: e.target.value })}
          placeholder="Phone 1"
        />
        <Input
          type="text"
          value={customer.phone_2 || ''}
          onChange={(e) => setCustomer({ ...customer, phone_2: e.target.value })}
          placeholder="Phone 2"
        />
        <Button type="submit" className="mx-2">Create Customer</Button>
        <Button type="button" onClick={onClose}>Cancel</Button>
      </form>
    </div>
  );
};

export default CustomerCreate;
