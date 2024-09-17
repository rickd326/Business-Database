import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Database } from '../lib/supabaseSchema';
import Button from '../ui/ButtonTw';
import Input from '../ui/InputTw';

type Customer = Database['public']['Tables']['customers']['Row'];

interface CustomerEditProps {
  customerId: number;
  onClose: () => void;
  onCustomerUpdated: () => void; // Added a callback prop to trigger after update
}

const CustomerEdit: React.FC<CustomerEditProps> = ({ customerId, onClose, onCustomerUpdated }) => {
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

    const { customer_id, ...updateData } = customer; // Exclude customer_id from update payload

    const { error } = await supabase
      .from('customers')
      .update(updateData)
      .eq('customer_id', customerId);

    if (error) {
      console.error('Error updating customer:', error);
    } else {
      alert('Customer updated successfully!');
      onClose();
      onCustomerUpdated(); // Call the callback to trigger a re-fetch or state update
    }
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Edit Customer</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={customer.first_name}
          onChange={(e) => setCustomer({ ...customer, first_name: e.target.value })}
          placeholder="First Name"
        />
        <Input
          type="text"
          value={customer.last_name}
          onChange={(e) => setCustomer({ ...customer, last_name: e.target.value })}
          placeholder="Last Name"
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
        <Button 
        type="submit"
       
        className="mx-2">
          Update Customer
        </Button>
        <Button 
        type="button" 
        onClick={onClose}>Cancel</Button>
      </form>
    </div>
  );
};

export default CustomerEdit;
