import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import CustomerDetail from './components/CustomerDetail';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container">
            <span className="navbar-brand fw-bold fs-4">
              🚗 Vehicle Parts Center - Customer Management
            </span>
            <div className="navbar-nav ms-auto">
              <a className="nav-link" href="/">Customers</a>
              <a className="nav-link" href="/add-customer">Add Customer</a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/add-customer" element={<CustomerForm />} />
            <Route path="/customer/:id" element={<CustomerDetail />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-light py-4 mt-5 text-center border-top">
          <p className="mb-0 text-muted">
            Vehicle Parts Selling & Inventory Management System © 2026
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;