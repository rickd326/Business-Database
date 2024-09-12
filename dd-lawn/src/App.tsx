import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'; // Updated imports
import CustomerList from './components/CustomerList';
import CustomerServices from './components/CustomerServices';

const App: React.FC = () => {
  // Helper component to extract params and pass them as props
  const CustomerServicesWithId = () => {
    const { customerId } = useParams<{ customerId: string }>();
    return <CustomerServices customerId={customerId || 'default-id'} />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/:customerId/services" element={<CustomerServicesWithId />} />
      </Routes>
    </Router>
  );
};

export default App;
