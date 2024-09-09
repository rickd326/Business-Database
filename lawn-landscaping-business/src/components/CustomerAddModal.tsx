import React, { useState } from 'react';
import { Customer } from '../types';
import { addCustomer } from '../api/customerApi';

interface Props {
  onClose: () => void;
  onSave: () => void;
}

function CustomerAddModal({ onClose, onSave }: Props) {
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({});

  const handleSave = async () => {
    await addCustomer(newCustomer);
    onSave();
    onClose();
  };

  return (
    <div className="modal">
      <h2>Add New Customer</h2>
      <input
        placeholder="Name"
        onChange={(e) => setNewCustomer((prev) => ({...prev, name: e.target.value}))}
      />
      {/* Add more fields as needed */}
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default CustomerAddModal;
