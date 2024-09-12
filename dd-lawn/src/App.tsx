import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated imports
import CustomerList from './components/CustomerList';
import CustomerServices from './components/CustomerServices';

const App: React.FC = () => {
  return (
    <Router>
      <Routes> // Replaced Switch with Routes
        <Route path="/customers" element={<CustomerList />} /> // Updated Route syntax
        <Route path="/customers/:customerId/services" element={<CustomerServices />} /> // Updated Route syntax
      </Routes>
    </Router>
  );
};

export default App;
