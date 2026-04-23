import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/customerApi';

interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  vehicles?: Array<{
    vehicleNumber: string;
    make: string;
    model: string;
    year: number;
  }>;
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async (term: string = '') => {
    setLoading(true);
    try {
      const response = term
        ? await api.get(`/customers/search?term=${term}`)
        : await api.get('/customers');
      
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      alert("Failed to load customers. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCustomers(searchTerm);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Customer Management</h2>
        <Link to="/add-customer" className="btn btn-primary btn-lg">
          + Register New Customer
        </Link>
      </div>

      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search by name, phone, email or vehicle number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-success" type="submit">
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Vehicle Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No customers found
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>
                      {customer.vehicles && customer.vehicles.length > 0 
                        ? customer.vehicles.map((v, i) => (
                            <span key={i}>
                              {v.vehicleNumber}
                              {i < customer.vehicles!.length - 1 ? ', ' : ''}
                            </span>
                          ))
                        : <span className="text-muted">No vehicle</span>
                      }
                    </td>
                    <td>
                      <Link
                        to={`/customer/${customer.id}`}
                        className="btn btn-info btn-sm"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerList;