import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate, Navigate } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerServices from './components/CustomerServices';
import Auth from './components/Auth';
import { supabase } from './lib/supabaseClient';  // Ensure you have this import if using Supabase

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
        <Route path="/login" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
