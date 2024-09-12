import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import Contracts from './components/Contracts'; // Ensure this path is correct
import ContractServices from './components/ContractServices'; // Ensure this path is correct

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contracts">Contracts</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/contract-services/:contractId" element={<ContractServices />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
