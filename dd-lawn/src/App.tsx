import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate } from 'react-router-dom'; // Updated imports
import CustomerList from './components/CustomerList';
import CustomerServices from './components/CustomerServices';

const App: React.FC = () => {
  // Helper component to extract params and pass them as props
  const CustomerServicesWithId = () => {
    const { customerId } = useParams<{ customerId: string }>();
    const navigate = useNavigate();
    return (
      <>
        <button onClick={() => navigate('/')}>Back to Customer List</button>
        <CustomerServices customerId={customerId || 'default-id'} />
      </>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/:customerId/services" element={<CustomerServicesWithId />} />
      </Routes>
    </Router>
  );
};

export default App;
