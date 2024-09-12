import React from 'react'; // Ensure React is imported
import { Contract } from '../types/index';  // Adjust the import path as necessary


interface ContractsModalProps {
  contracts: Contract[];
  onClose: () => void;
}

const ContractsModal: React.FC<ContractsModalProps> = ({ contracts, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full m-4">
        <h2 className="text-lg font-bold mb-4">Customer Contracts</h2>
        <ul>
          {contracts.map(contract => (
            <li key={contract.contract_id} className="mb-2">
              <a href={`/contracts/${contract.contract_id}`} className="text-blue-500 hover:text-blue-700">
                {contract.start_date} - {contract.end_date}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContractsModal;
