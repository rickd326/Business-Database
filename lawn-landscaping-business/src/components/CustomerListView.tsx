import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.ts'; // Adjust this import path as needed
import { Database } from '../lib/supabaseSchema.ts'; // Adjust if your schema file has a different name

type Customer = Database['public']['Tables']['customers']['Row'];

const CustomerListView: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('');

  
  
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .order('last_name', { ascending: true });

        if (error) throw error;
        setCustomers(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    async function checkConnection() {
      try {
        const { data, error } = await supabase.from('customers').select('count', { count: 'exact' });
        if (error) throw error;
        setConnectionStatus('Connected to Supabase');
        console.log('Connection successful, row count:', data);
      } catch (error) {
        setConnectionStatus('Failed to connect to Supabase');
        console.error('Connection error:', error);
      }
    }

    checkConnection();
  }, []);

  if (loading) return <div>Loading customers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <p>Connection status: {connectionStatus}</p>
      <h2>Customer List</h2>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul>
          {customers.map((customer) => (
            <li key={customer.customer_id}>
              {customer.last_name} - {customer.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerListView;
