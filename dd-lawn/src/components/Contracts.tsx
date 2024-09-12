import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'; // Corrected path
import { Contract } from '../types'; // Import the interface

export default function Contracts() {
  const [contracts, setContracts] = useState<Contract[]>([]); // Use the Contract interface

  useEffect(() => {
    const fetchContracts = async () => {
      const { data, error } = await supabase
        .from('contracts') // Remove the generic type parameter here
        .select('*'); // Remove the generic type parameter from select
      if (error) console.error('Error loading contracts', error);
      else setContracts(data || []);
    };

    fetchContracts();
  }, []);

  return (
    <div>
      <h1>Contracts</h1>
      <ul>
        {contracts.map(contract => (
          <li key={contract.contract_id}>
            <Link to={`/contract-services/${contract.contract_id}`}>
              {contract.status} - {contract.start_date} to {contract.end_date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
