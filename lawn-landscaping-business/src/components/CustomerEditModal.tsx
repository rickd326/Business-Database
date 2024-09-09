import React, { useState } from 'react';
import { Customer } from '../types';
import { updateCustomer } from '../api/customerApi';

interface Props {
  customer: Customer;
  onClose: () => void;
  onSave: () => void;
}

function CustomerEditModal({ customer, onClose, onSave }: Props) {
  const [editedCustomer, setEditedCustomer] = useState(customer);

  const handleSave = async () => {
    await updateCustomer(editedCustomer);
    onSave();
    onClose();
  };

  return (
    <div className="modal">
      <h2>Edit Customer</h2>
      <input
        value={editedCustomer.last_name}
        onChange={(e) => setEditedCustomer({...editedCustomer, last_name: e.target.value})}
      />
      {/* Add more fields as needed */}
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default CustomerEditModal;
